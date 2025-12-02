// src/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Mặc định lưu ở localStorage

// Import các slice
import appSlice from './appSlice';
import userSlice from './user/userSlice';
import cartSlice from './cart/cartSlice';

// Cấu hình redux-persist cho user
const userPersistConfig = {
  key: 'shop/user',
  storage,
  whitelist: ['isLoggedIn', 'token', 'current'],
};

// Cấu hình redux-persist cho cart
const cartPersistConfig = {
  key: 'shop/cart',
  storage,
  whitelist: ['cartItems', 'totalPrice', 'totalQuantity'],
};

// Gộp tất cả reducer
const rootReducer = combineReducers({
  app: appSlice,
  user: persistReducer(userPersistConfig, userSlice),
  cart: persistReducer(cartPersistConfig, cartSlice),
});

// Cấu hình store chính
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Bỏ kiểm tra serializable do redux-persist lưu object
    }),
});

// Tạo persistor để dùng trong <PersistGate>
export const persistor = persistStore(store);
