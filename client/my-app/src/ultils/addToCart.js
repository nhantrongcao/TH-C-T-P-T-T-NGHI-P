// src/ultils/addToCart.js
import { store } from '../store/redux';
import { addToCart as addToCartAction } from '../store/cart/cartSlice';

export const addToCart = (product, quantity = 1) => {
  if (!product || !product._id) return;

  store.dispatch(
    addToCartAction({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.images?.[0],
      quantity,
    })
  );
};
