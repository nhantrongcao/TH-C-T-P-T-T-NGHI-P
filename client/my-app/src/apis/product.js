import axios from "../ultils/axios";

// Lấy token từ Redux persist
const getToken = () => {
  try {
    const persistedUser = JSON.parse(localStorage.getItem("persist:shop/user"));
    const current = persistedUser?.current ? JSON.parse(persistedUser.current) : null;
    return current?.accessToken || "";
  } catch (err) {
    return "";
  }
};

// Lấy danh sách sản phẩm (GET /product)
export const apiGetProducts = (params) =>
  axios({
    url: "/product/",
    method: "get",
    params,
  });

// Lấy chi tiết sản phẩm (GET /product/:pid)
export const apiGetProduct = (pid) =>
  axios({
    url: "/product/" + pid,
    method: "get",
  });

// Tạo sản phẩm mới (POST /product)
export const apiCreateProduct = (data) =>
  axios({
    url: "/product",
    method: "post",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data,
  });

// Cập nhật sản phẩm (PUT /product/:pid)
export const apiUpdateProduct = (pid, data) =>
  axios({
    url: `/product/${pid}`,
    method: "put",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    data,
  });

// Xóa sản phẩm (DELETE /product/:pid)
export const apiDeleteProduct = (pid) =>
  axios({
    url: `/product/${pid}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
