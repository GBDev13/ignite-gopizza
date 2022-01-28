import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { Product } from '@screens/Product';
import { useAuth } from '@hooks/auth';
import { UserTabRoutes } from './user.tab.routes';
import { Order } from '@screens/Order';

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function UserStackRoutes() {
  const { user } = useAuth();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user?.isAdmin ? (
        <Group>
          <Screen name="home" component={Home} />
          <Screen name="product" component={Product} />
        </Group>
      ) : (
        <Group>
          <Screen name="UserTabRoutes" component={UserTabRoutes}/>
          <Screen name="order" component={Order} />
        </Group>
      )}
    </Navigator>
  )
}