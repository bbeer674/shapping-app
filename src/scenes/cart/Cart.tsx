import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {IconBack, IconBin, IconMark} from '../../assets/Icon';
import {SHOPPING_SCREEN_SCENE} from '../../navigator/Constants';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {removeFromCart, updateQuantity, clearCart} from '../../redux/cartSlice';

type RootStackParamList = {
  [SHOPPING_SCREEN_SCENE]: undefined;
};
type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'SHOPPING_SCREEN_SCENE'
>;

interface CartItem {
  source: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

function Cart() {
  const navigation = useNavigation<NavigationProp>();
  const cartsItem = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [payment, setPayment] = useState(false);

  const deleteItem = (id: string, source: string) => {
    dispatch(removeFromCart({id, source: source as 'recommend' | 'latest'}));
  };

  const handleUpdateQuantity = (id: string, change: number, source: string) => {
    dispatch(
      updateQuantity({id, change, source: source as 'recommend' | 'latest'}),
    );
  };

  const renderRightActions = (id: string, source: string) => (
    <View style={styles.deleteContainer}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(id, source)}>
        <IconBin />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}: {item: CartItem}) => {
    if (item.source !== 'recommend' && item.source !== 'latest') return null;

    return (
      <Swipeable
        renderRightActions={() => renderRightActions(item.id, item.source)}>
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
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(item.id, -1, item.source)}>
              <Text style={styles.quantityText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(item.id, 1, item.source)}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swipeable>
    );
  };

  const calculateTotalPrice = (cartItems: any[]) => {
    let subtotal = 0;
    let discount = 0;

    cartItems.forEach((item: {quantity: number; price: number}) => {
      const pairCount = Math.floor(item.quantity / 2);
      const remainingCount = item.quantity % 2;

      const pairPrice = item.price * 2;
      const pairDiscount = pairPrice * 0.05;
      const totalPairPrice = pairPrice - pairDiscount;

      const productTotal =
        pairCount * totalPairPrice + remainingCount * item.price;

      subtotal += productTotal;
      discount += pairCount * pairDiscount;
    });

    return {subtotal, discount, total: subtotal};
  };

  const {subtotal, discount, total} = calculateTotalPrice(cartsItem);

  const handleCheckout = async (cartItems: any[]) => {
    try {
      const products = cartItems.map((item: {id: any}) => item.id);

      const response = await fetch('http://localhost:8080/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({products}),
      });

      if (response.status === 204) {
        const id = cartItems.map(item => item.id);
        setPayment(true);
        dispatch(clearCart());
        return;
      }

      if (response.status === 500) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Internal Server Error');
        return;
      }

      if (response.status === 502) {
        setErrorMessage('Bad Gateway. Please try again later.');
        return;
      }

      setErrorMessage('Something went wrong');
    } catch (error) {
      setErrorMessage('Network Error. Please check your connection.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxTitle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconBack />
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
      </View>

      {cartsItem.length === 0 && !payment && (
        <View style={styles.boxItem}>
          <Text style={styles.emptyText}>Empty Cart</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(SHOPPING_SCREEN_SCENE)}>
            <Text style={styles.buttonText}>Go to shopping</Text>
          </TouchableOpacity>
        </View>
      )}

      {cartsItem.length !== 0 && !payment && (
        <GestureHandlerRootView style={styles.boxContainer}>
          <FlatList
            data={cartsItem}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 150,
            }}
          />
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryPrice}>{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.discountText}>Promotion discount</Text>
              <Text style={styles.discountPrice}>-{discount.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>{total.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => handleCheckout(cartsItem)}>
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
          {errorMessage && !payment ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
              <TouchableOpacity onPress={() => setErrorMessage('')}>
                <IconMark />
              </TouchableOpacity>
            </View>
          ) : null}
        </GestureHandlerRootView>
      )}

      {payment && cartsItem.length !== 0 && (
        <View style={styles.boxItem}>
          <Text style={styles.successText}>Success!</Text>
          <Text style={styles.textDesc}>Thank you for shopping with us!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(SHOPPING_SCREEN_SCENE)}>
            <Text style={styles.buttonText}>Shop again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7FF',
    paddingTop: 50,
  },
  boxContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'medium',
    position: 'absolute',
    top: 20,
    left: 20,
    marginLeft: 20,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6D4C90',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  boxTitle: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textDesc: {
    color: '#000000',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 188,
    backgroundColor: '#B3261E',
  },
  deleteButton: {
    padding: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 76,
    marginBottom: 24,
    paddingHorizontal: 16,
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
  summaryContainer: {
    backgroundColor: '#E8DEF8',
    height: 163,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingTop: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  summaryText: {
    fontSize: 16,
    color: '#4F378A',
    fontWeight: 'bold',
  },
  summaryPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  discountText: {
    fontSize: 16,
    color: '#4F378A',
    fontWeight: 'bold',
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C62828',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 4,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4F378A',
  },
  checkoutButton: {
    width: 177,
    height: 43,
    backgroundColor: '#65558F',
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#D32F2F',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: '#FFFFFF',
  },
  closeButton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Cart;
