// src/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoggedIn: false,
  current: null,
  token: null,
};

try {
  const raw = localStorage.getItem("persist:shop/user");
  if (raw) {
    const parsed = JSON.parse(raw);
    initialState = {
      isLoggedIn: parsed.isLoggedIn === "true",
      current: parsed.current ? JSON.parse(parsed.current) : null, // ✅ parse lại thành object
      token: parsed.token ? JSON.parse(parsed.token) : null,       // ✅ parse lại token string
    };
  }
} catch (e) {
  console.error("❌ Lỗi khi parse localStorage:", e);
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      state.isLoggedIn = true;
      state.current = action.payload.userData;
      state.token = action.payload.token;

      const persistData = {
        isLoggedIn: "true",
        current: JSON.stringify(action.payload.userData), // ✅ stringify để lưu
        token: JSON.stringify(action.payload.token),      // ✅ stringify token
      };

      localStorage.setItem("persist:shop/user", JSON.stringify(persistData));
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.current = null;
      state.token = null;
      localStorage.removeItem("persist:shop/user");
    },
  },
});

export const { register, logout } = userSlice.actions;
export default userSlice.reducer;
