import React from "react";
import "./ProductCard.css";
import { renderStarFromNumber } from "../../ultils/helper";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path"; // Đảm bảo import đúng

// Hàm định dạng giá tiền
const formatPrice = (price) => price?.toLocaleString("vi-VN");

const ProductCard = ({ pid, image, title, totalRating, price, category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Điều hướng sử dụng path từ file path.js
    navigate(`/${category}/${pid}/${title}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        <img src={image} alt="product" className="product-image-card" />
      </div>

      <div className="product-info-card">
        <span className="product-title-card">{title}</span>
        <span className="product-rating-card">
          {renderStarFromNumber(totalRating)}
        </span>
        <span className="product-price-card">{formatPrice(price)} VNĐ</span>
      </div>
    </div>
  );
};

export default ProductCard;
