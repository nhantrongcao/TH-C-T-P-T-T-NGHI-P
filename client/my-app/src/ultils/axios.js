import axios from 'axios';

// Tạo một instance của axios
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI || 'http://localhost:5000/api',
  timeout: 10000, // timeout sau 10s
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Thêm Authorization header nếu có token
instance.interceptors.request.use(
  (config) => {
    try {
      const raw = localStorage.getItem('persist:shop/user');
      if (raw) {
        const parsed = JSON.parse(raw);
        let token = parsed?.token;

        // Fix trường hợp token bị stringify 2 lần
        if (typeof token === 'string' && token.startsWith('"') && token.endsWith('"')) {
          token = JSON.parse(token);
        }

        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('Không thể lấy token từ localStorage:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Trả về response.data nếu thành công
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.error('❌ Lỗi response:', error.response);
      return Promise.reject(error.response);
    } else if (error.request) {
      console.error('❌ Không nhận được phản hồi từ server:', error.request);
      return Promise.reject(error.request);
    } else {
      console.error('❌ Lỗi không xác định:', error.message);
      return Promise.reject(error.message);
    }
  }
);

export default instance;
