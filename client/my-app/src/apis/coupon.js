import axios from "../ultils/axios";

// ✅ Không cần token
export const apiValidateCoupon = (couponCode) =>
  axios.get(`/coupon/validate/${couponCode}`, {
    headers: { Authorization: undefined }, // Xoá token nếu axios có interceptor
  });

// ⚠️ Các route này cần token (admin)
export const apiGetCoupons = () => axios.get("/coupon");
export const apiCreateCoupon = (data) => axios.post("/coupon", data);
export const apiDeleteCoupon = (cid) => axios.delete(`/coupon/${cid}`);
export const apiUpdateCoupon = (cid, data) => axios.put(`/coupon/${cid}`, data);
export const apiApplyCoupon = (couponCode) =>
  axios.post("/coupon/apply", { couponCode });
