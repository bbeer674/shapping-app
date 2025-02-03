import {View, Text, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {CART_SCREEN_SCENE, SHOPPING_SCREEN_SCENE} from './Constants';
import {IconActive, IconInActive} from '../assets/Icon';

interface TabbarLayoutProps {
  state: any;
  descriptors: any;
  navigation: any;
}
const TabbarLayout: React.FC<TabbarLayoutProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const getTabName = (routeName: string): string => {
    if (routeName === SHOPPING_SCREEN_SCENE) return 'Shopping';
    else if (routeName === CART_SCREEN_SCENE) return 'Cart';
    return '';
  };

  return (
    <View style={styles.gradientContainer}>
      <View style={styles.container}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];

          const label = getTabName(route.name);

          const isFocused = state.index === index;

          const onPress = async () => {
            navigation.navigate(route.name);
          };

          return (
            <TouchableOpacity
              key={`tab-layout-${index}`}
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.buttonContainer}>
              <View
                style={[
                  styles.focusButton,
                  {
                    backgroundColor: isFocused ? '#E8DEF8' : 'transparent',
                  },
                ]}>
                {!isFocused ? <IconInActive /> : <IconActive />}
              </View>
              <Text
                style={[
                  styles.textMenu,
                  {
                    color: isFocused ? '#1D1B20' : '#49454F',
                  },
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#F3EDF7',
    paddingBottom: Platform.OS === 'ios' ? 12 : 17,
  },
  container: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  textMenu: {
    fontSize: 14,
    marginTop: 3,
  },
  focusButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: 64,
    borderRadius: 16,
  },
});

export default TabbarLayout;
