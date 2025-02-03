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

const API_PRODUCTS = 'http://localhost:8080/products?limit=20';

function LatestProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const dispatch = useDispatch();
  const cartsItem = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        nextCursor ? `${API_PRODUCTS}&cursor=${nextCursor}` : API_PRODUCTS,
      );
      const data = await response.json();

      if (!data || !Array.isArray(data.items)) {
        console.error('Invalid API response:', data);
        return;
      }

      setProducts(prev => [...prev, ...data.items]);
      setNextCursor(data.nextCursor || null);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({...product, quantity: 1, source: 'latest'}));
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    dispatch(updateQuantity({id, change, source: 'latest'}));
  };

  const renderProductItem = ({item}: {item: Product}) => {
    const cartItem = cartsItem.find(
      cartItem => cartItem.id === item.id && cartItem.source === 'latest',
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
        <Text style={styles.title}>Latest Products</Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item, index) =>
          `latest-${index}-${item.name}-${item.id}`
        }
        onEndReached={fetchProducts}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#65558F" /> : null
        }
      />
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
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 76,
    marginBottom: 24,
  },
  productImage: {width: 76, height: 76, marginRight: 12},
  productInfo: {flex: 1},
  productName: {fontSize: 14, fontWeight: 'bold'},
  productPrice: {fontSize: 16, fontWeight: 'bold', color: '#4F378B'},
  addToCartButton: {
    backgroundColor: '#65558F',
    alignItems: 'center',
    justifyContent: 'center',
    width: 107,
    height: 40,
    borderRadius: 50,
  },
  textstyle: {color: '#fff', fontSize: 14, fontWeight: 'bold'},
  quantityContainer: {flexDirection: 'row', alignItems: 'center'},
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 15,
    backgroundColor: '#65558F',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  quantityText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 4,
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
});

export default LatestProducts;
