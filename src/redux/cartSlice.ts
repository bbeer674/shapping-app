import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  source: 'recommend' | 'latest';
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const {id, source} = action.payload;
      const existingItem = state.items.find(
        item => item.id === id && item.source === source,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        change: number;
        source: 'recommend' | 'latest';
      }>,
    ) => {
      const item = state.items.find(
        item =>
          item.id === action.payload.id &&
          item.source === action.payload.source,
      );
      if (item) {
        item.quantity = Math.max(item.quantity + action.payload.change, 0);
        if (item.quantity === 0) {
          state.items = state.items.filter(
            i =>
              !(
                i.id === action.payload.id && i.source === action.payload.source
              ),
          );
        }
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{id: string; source: 'recommend' | 'latest'}>,
    ) => {
      state.items = state.items.filter(
        item =>
          !(
            item.id === action.payload.id &&
            item.source === action.payload.source
          ),
      );
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {addToCart, updateQuantity, removeFromCart, clearCart} =
  cartSlice.actions;
export default cartSlice.reducer;
