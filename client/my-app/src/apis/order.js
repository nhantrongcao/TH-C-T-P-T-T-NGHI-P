import axios from '../ultils/axios';

export const apiGetUserOrders = () =>
  axios({
    url: '/order',
    method: 'get',
  });

export const apiCreateOrder = (data, token) =>
  axios.post('/order', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
