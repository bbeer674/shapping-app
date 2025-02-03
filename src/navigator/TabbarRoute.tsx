import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabbarLayout from './TabbarLayout';
import {CART_SCREEN_SCENE, SHOPPING_SCREEN_SCENE} from './Constants';
import Shopping from '../scenes/shopping/Shopping';
import Cart from '../scenes/cart/Cart';

const TabbarRoute: React.FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <TabbarLayout {...props} />}>
      <Tab.Screen name={SHOPPING_SCREEN_SCENE} component={Shopping} />
      <Tab.Screen name={CART_SCREEN_SCENE} component={Cart} />
    </Tab.Navigator>
  );
};

export default TabbarRoute;
