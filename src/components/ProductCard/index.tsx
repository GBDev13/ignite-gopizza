import React from 'react';
import { useTheme } from 'styled-components/native';
import { Container, Content, Description, Details, Identification, Image, Line, Name } from './styles';
import { Feather } from '@expo/vector-icons';
import { RectButtonProps } from 'react-native-gesture-handler';

export type ProductProps = {
  id: string;
  photo_url: string;
  name: string;
  description: string;
}

type Props = RectButtonProps & {
  data: ProductProps;
}

export function ProductCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
          </Identification>

          <Description>
            {data.description}
          </Description>
        </Details>
      </Content>

      <Line />
    </Container>
  )
}