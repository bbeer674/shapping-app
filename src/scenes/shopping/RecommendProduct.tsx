import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IconWrong} from '../../assets/Icon';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {addToCart, updateQuantity} from '../../redux/cartSlice';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const API_RECOMMENDED = 'http://localhost:8080/recommended-products';
const screenHeight = Dimensions.get('window').height;

function RecommendProduct() {
  const [loadingRecommended, setLoadingRecommended] = useState(false);
  const [errorRecommended, setErrorRecommended] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const cartsItem = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    fetchRecommendedProducts();
  }, []);

  const fetchRecommendedProducts = async () => {
    try {
      setLoadingRecommended(true);
      setErrorRecommended(false);
      const response = await fetch(API_RECOMMENDED);
      if (!response.ok) throw new Error('Failed to fetch recommended products');
      const data = await response.json();
      setRecommendedProducts(data);
    } catch (error) {
      setErrorRecommended(true);
    } finally {
      setLoadingRecommended(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({...product, quantity: 1, source: 'recommend'}));
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    dispatch(updateQuantity({id, change, source: 'recommend'}));
  };

  const renderProductItem = ({item}: {item: Product}) => {
    const cartItem = cartsItem.find(
      cartItem => cartItem.id === item.id && cartItem.source === 'recommend',
    );

    return (
      <View style={styles.productItem}>
        <Image
          resizeMode="contain"
          source={require('../../assets/Images/image_product.png')}
          style={styles.productImage}
        />

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.boxPrice}>
            <Text style={styles.productPrice}>{item.price.toFixed(2)}</Text>
            <Text style={styles.textUnit}> / unit</Text>
          </View>
        </View>

        {cartItem ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(item.id, -1)}>
              <Text style={styles.quantityText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{cartItem.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(item.id, 1)}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => handleAddToCart(item)}>
            <Text style={styles.textstyle}>Add to cart</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxTitle}>
        <Text style={styles.title}>Recommend Product</Text>
      </View>
      {loadingRecommended ? (
        <ActivityIndicator size="large" color="#8D6CA1" />
      ) : errorRecommended ? (
        <View style={styles.errorContainer}>
          <IconWrong />
          <Text style={styles.errorText}>Something went wrong</Text>
          <TouchableOpacity
            onPress={fetchRecommendedProducts}
            style={styles.refreshButton}>
            <Text style={styles.textstyle}>Refresh</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={recommendedProducts}
          renderItem={renderProductItem}
          keyExtractor={(item, index) =>
            `recommend-${index}-${item.name}-${item.id}`
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}
          style={{height: screenHeight / 3}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  boxTitle: {
    height: 64,
  },
  title: {
    fontSize: 24,
    color: '#1D1B20',
    fontWeight: 'medium',
    alignItems: 'center',
    paddingVertical: 18,
  },
  refreshButton: {
    backgroundColor: '#65558F',
    width: 98,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    color: '#000000',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'medium',
  },
  textstyle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 76,
    marginBottom: 24,
  },
  productImage: {
    width: 76,
    height: 76,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#21005D',
  },
  productPrice: {
    fontSize: 16,
    color: '#4F378B',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#65558F',
    alignItems: 'center',
    justifyContent: 'center',
    width: 107,
    height: 40,
    borderRadius: 50,
  },
  boxPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textUnit: {
    fontSize: 14,
    color: '#625B71',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 15,
    backgroundColor: '#65558F',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  quantityText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 4,
  },
});

export default RecommendProduct;
