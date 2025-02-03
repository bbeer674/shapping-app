import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MAIN_SCREEN_SCENE} from './src/navigator/Constants';
import TabbarRoute from './src/navigator/TabbarRoute';
import {Provider} from 'react-redux';
import store from './src/redux/store';

type RootStackParamList = {
  MAIN_SCREEN_SCENE: {};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          <Stack.Screen name={MAIN_SCREEN_SCENE} component={TabbarRoute} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
