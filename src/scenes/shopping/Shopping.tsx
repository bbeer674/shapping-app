import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import RecommendProduct from './RecommendProduct';
import LatestProducts from './LatestProducts';

function Shopping() {
  return (
    <View style={styles.container}>
      <RecommendProduct />
      <LatestProducts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#FEF7FF',
  },
});

export default Shopping;
