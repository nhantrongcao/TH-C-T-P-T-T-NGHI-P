import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { formatPrice } from "../../ultils/cartHelpers";
import { clearCart } from "../../store/cart/cartSlice";
import { apiCreateOrder } from "../../apis/order";
import { apiUpdateUserCart } from "../../apis/user";
import { apiValidateCoupon } from "../../apis/coupon";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { current } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    shippingAddress: "",
    note: "",
    couponCode: "",
    paymentMethod: "COD",
    deliveryMethod: "standard",
  });

  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponInfo, setCouponInfo] = useState(null);
  const [finalPrice, setFinalPrice] = useState(totalPrice);
  const [couponError, setCouponError] = useState("");
  const [orderMessage, setOrderMessage] = useState("");

  const { shippingAddress, note, couponCode, paymentMethod, deliveryMethod } = formData;

  const initialOptions = {
    "client-id": "test",
    currency: "USD",
    intent: "capture",
  };

  useEffect(() => {
    if (!cartItems.length) return;
    const syncCart = async () => {
      try {
        await apiUpdateUserCart(cartItems, current?.accessToken);
      } catch (err) {
        console.error("Lỗi khi đồng bộ giỏ hàng:", err);
      }
    };
    syncCart();
  }, [cartItems, current]);

  useEffect(() => {
    setFinalPrice(totalPrice);
    setCouponInfo(null);
    setCouponError("");
  }, [totalPrice]);

  const handleValidateCoupon = async () => {
    try {
      const code = couponCode.trim();
      if (!code) {
        setCouponInfo(null);
        setCouponError("❗ Vui lòng nhập mã hợp lệ.");
        setFinalPrice(totalPrice);
        return;
      }

      const res = await apiValidateCoupon(code);
      if (res?.data?.success) {
        const coupon = res.data.coupon;
        const discountAmount = (totalPrice * coupon.discount) / 100;
        setCouponInfo(coupon);
        setCouponError("");
        setFinalPrice(totalPrice - discountAmount);
      } else {
        setCouponInfo(null);
        setCouponError("❌ Mã không hợp lệ hoặc đã hết hạn.");
        setFinalPrice(totalPrice);
      }
    } catch (err) {
      console.error("Lỗi khi xác minh mã:", err);
      setCouponInfo(null);
      setCouponError("❌ Có lỗi xảy ra khi xác minh mã.");
      setFinalPrice(totalPrice);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateOrder = async (paymentResult = null) => {
    setOrderMessage("");

    if (!shippingAddress?.trim() || !cartItems?.length || !deliveryMethod || !paymentMethod) {
      setOrderMessage("❗ Vui lòng nhập đầy đủ thông tin đơn hàng!");
      return;
    }

    setLoading(true);
    try {
      const token = current?.accessToken;
      const payload = {
        products: cartItems.map((item) => ({
          product: item._id,
          count: item.quantity,
          color: item.color || "default",
        })),
        shippingAddress: shippingAddress.trim(),
        note: note?.trim() || "",
        coupon: couponInfo?.name || null,
        paymentMethod: paymentMethod.toUpperCase(),
        isPaid: paymentMethod === "paypal",
        paymentResult: paymentResult || null,
        deliveryMethod: deliveryMethod,
        total: finalPrice,
      };

      const res = await apiCreateOrder(payload, token);

      if (res?.data?.success) {
        dispatch(clearCart());
        setOrderMessage("✅ Đơn hàng của bạn đã được tạo thành công!");
        setTimeout(() => navigate("/profile"), 2000);
      } else {
        setOrderMessage(`✅ ${res?.data?.message || "Tạo đơn thanh cong!"}`);
      }
    } catch (err) {
      console.error("❌ Lỗi tạo đơn hàng:", err);
      setOrderMessage("❌ Có lỗi xảy ra khi đặt hàng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Trang thanh toán</h2>

      <div className="checkout-summary">
        <h3>Sản phẩm:</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              {item.title} - {item.quantity} x {formatPrice(item.price)} VNĐ
            </li>
          ))}
        </ul>
        <h3>Tạm tính: {formatPrice(totalPrice)} VNĐ</h3>
        {couponInfo && (
          <p className="discount-info">
            ✅ Mã <strong>{couponInfo.name}</strong> áp dụng: -{couponInfo.discount}% (
            {formatPrice(totalPrice - finalPrice)} VNĐ)
          </p>
        )}
        {couponError && <p className="error-msg">{couponError}</p>}
        <h3>Tổng cộng: {formatPrice(finalPrice)} VNĐ</h3>
      </div>

      <div className="order-info">
        <label>Địa chỉ giao hàng: *</label>
        <input
          type="text"
          name="shippingAddress"
          value={shippingAddress}
          onChange={handleInputChange}
          placeholder="VD: 123 Lê Lợi, TP.HCM"
        />

        <label>Ghi chú (không bắt buộc):</label>
        <textarea
          name="note"
          value={note}
          onChange={handleInputChange}
          rows={3}
          placeholder="Ghi chú cho đơn hàng..."
        />

        <label>Mã giảm giá:</label>
        <div className="coupon-row">
          <input
            type="text"
            name="couponCode"
            value={couponCode}
            onChange={handleInputChange}
            placeholder="Nhập mã giảm giá"
          />
          <button type="button" onClick={handleValidateCoupon}>
            Áp dụng
          </button>
        </div>

        <label>Phương thức vận chuyển:</label>
        <select name="deliveryMethod" value={deliveryMethod} onChange={handleInputChange}>
          <option value="standard">Tiêu chuẩn</option>
          <option value="express">Hỏa tốc</option>
        </select>

        <label>Phương thức thanh toán:</label>
        <select name="paymentMethod" value={paymentMethod} onChange={handleInputChange}>
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      {orderMessage && <p className="order-msg">{orderMessage}</p>}

      {paid ? (
        <div className="payment-success">
          <h3>✅ Thanh toán thành công!</h3>
          {loading && <p>Đang xử lý đơn hàng...</p>}
        </div>
      ) : paymentMethod === "paypal" ? (
        <PayPalScriptProvider options={initialOptions}>
          <div className="paypal-box">
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) =>
                actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: (finalPrice / 24000).toFixed(2),
                      },
                    },
                  ],
                })
              }
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                setPaid(true);
                handleCreateOrder({
                  id: details.id,
                  status: details.status,
                  update_time: details.update_time,
                  email_address: details.payer.email_address,
                });
              }}
              onError={(err) => {
                console.error("Thanh toán PayPal lỗi:", err);
                setOrderMessage("❌ Không thể thanh toán qua PayPal.");
              }}
            />
          </div>
        </PayPalScriptProvider>
      ) : (
        <button className="cod-order-btn" onClick={() => handleCreateOrder()} disabled={loading}>
          {loading ? "Đang xử lý..." : "Đặt hàng (COD)"}
        </button>
      )}
    </div>
  );
};

export default CheckoutPage;
