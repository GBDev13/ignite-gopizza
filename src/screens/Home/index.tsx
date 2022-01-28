import React, { useCallback, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import happyEmoji from '@assets/happy.png';

import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Header,
  MenuHeader,
  MenuItemsNumber,
  NewProductButton,
  Title
} from './styles';
import { useTheme } from 'styled-components/native';
import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';

export function Home() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState('');

  const { COLORS } = useTheme();
  const navigation = useNavigation();

  function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
    .collection('pizzas')
    .orderBy('name_insensitive')
    .startAt(formattedValue)
    .endAt(`${formattedValue}\uf8ff`)
    .get()
    .then(response => {
      const data = response.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ProductProps[];

      setPizzas(data);
    })
    .catch(() => Alert.alert("Consulta", "Não foi possível realizar a consulta"))
  };

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch('');
    fetchPizzas(search);
  }

  useFocusEffect(useCallback(() => {
    fetchPizzas("")
  }, []));

  function handleOpen(id: string) {
    navigation.navigate("product", { id });
  }

  function handleAdd() {
    navigation.navigate("product", {});
  }

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji}/>
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>
        
        <TouchableOpacity>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24}/>
        </TouchableOpacity>
      </Header>

      <Search
        onSearch={handleSearch}
        onClear={handleSearchClear}
        value={search}
        onChangeText={setSearch}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            data={item}
            onPress={() => handleOpen(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop:20,
          paddingBottom: 125,
          marginHorizontal: 24
        }}
      />

      <NewProductButton
        title="Cadastrar Pizza"
        type="secondary"
        onPress={handleAdd}
      />
    </Container>
  )
}