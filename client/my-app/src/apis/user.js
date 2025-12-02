import axios from "../ultils/axios";


export const apiRegister = (data) => axios({
    url:'/user/register',
    method:'post',
    data,
 
})

    
export const apiLogin = (data) => axios({
    url:'/user/login',
    method:'post',
    data
})

    
export const apiForgotPassword = (data) => axios({
    url:'/user/forgotpassword',
    method:'post',
    data
})

export const apiResetPassword = (data) => axios({
    url:'/user/resetpassword',
    method:'put',
    data
})
export const apiFinalRegister = (token) => axios({
    url: `/user/finalregister/${token}`,
    method: 'put',
});
export const apiGetCurrent = () => axios({
    url: '/user/current', // ✅ dùng đúng prefix
    method: 'get',
});
export const apiGetUserProfile = () => axios({
    url: '/user/profile',
    method: 'get',
});
// Cập nhật giỏ hàng lên database
export const apiUpdateUserCart = (cart, token) =>
    axios({
      url: "/user/cart",
      method: "put",
      data: { cart },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  