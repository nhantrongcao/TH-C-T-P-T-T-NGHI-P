import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart
} from "../../store/cart/cartSlice";
import { formatPrice } from "../../ultils/cartHelpers";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, totalPrice, totalQuantity } = useSelector((state) => state.cart);

  const handleRemove = (id) => dispatch(removeFromCart(id));
  const handleClear = () => dispatch(clearCart());

  const handleQuantityChange = (id, quantity, type) => {
    const newQuantity = type === "increase" ? quantity + 1 : quantity - 1;
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    if (!cartItems.length) return alert("Giỏ hàng đang trống!");
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <p>🛒 Hiện chưa có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>Giá: {formatPrice(item.price)} VNĐ</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item._id, item.quantity, "decrease")}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item._id, item.quantity, "increase")}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                    ❌ Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Tổng số lượng: {totalQuantity}</h3>
            <h3>Tổng tiền: {formatPrice(totalPrice)} VNĐ</h3>
            <div className="cart-actions">
              <button className="clear-btn" onClick={handleClear}>
                Xoá toàn bộ
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                🧾 Đi tới thanh toán
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
