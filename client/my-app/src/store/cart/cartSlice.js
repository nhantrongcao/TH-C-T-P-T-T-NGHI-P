// src/store/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(i => i._id === item._id);

      if (existItem) {
        existItem.quantity += item.quantity;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity });
      }

      state.totalQuantity = state.cartItems.reduce((acc, i) => acc + i.quantity, 0);
      state.totalPrice = state.cartItems.reduce((acc, i) => acc + i.quantity * i.price, 0);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i._id !== action.payload);
      state.totalQuantity = state.cartItems.reduce((acc, i) => acc + i.quantity, 0);
      state.totalPrice = state.cartItems.reduce((acc, i) => acc + i.quantity * i.price, 0);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(i => i._id === id);
      if (item) item.quantity = quantity;

      state.totalQuantity = state.cartItems.reduce((acc, i) => acc + i.quantity, 0);
      state.totalPrice = state.cartItems.reduce((acc, i) => acc + i.quantity * i.price, 0);
    },
    clearCart: state => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
