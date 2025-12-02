import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./DealDaily.css";
import { apiGetProducts } from "../../apis/product";
import { renderStarFromNumber } from "../../ultils/helper";
import Countdown from "../Countdown/Countdown";

// Hàm định dạng giá tiền theo chuẩn VNĐ
const formatPrice = (price) => price.toLocaleString("vi-VN");

let idInterval;

// Component chính DealDaily
const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  const navigate = useNavigate(); // Initialize navigate function

  // Fetch sản phẩm deal daily
  const fetchDealDaily = async () => {
    try {
      const response = await apiGetProducts({
        limit: 1,
        page: Math.round(Math.random() * 10),
        totalRating: 5,
      });
      if (response.success) {
        setDealDaily(response.products[0]);
        const now = new Date();
        const h = 23 - now.getHours();
        const m = 59 - now.getMinutes();
        const s = 59 - now.getSeconds();
        setHour(h);
        setMinute(m);
        setSecond(s);
      } else {
        setHour(0);
        setMinute(59);
        setSecond(59);
      }
    } catch (error) {
      console.error("Lỗi khi lấy deal daily:", error);
    }
  };

  // Gọi API khi component render lần đầu
  useEffect(() => {
    clearInterval(idInterval);
    fetchDealDaily();
  }, [expireTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);

  // Hàm điều hướng đến trang chi tiết sản phẩm
  const handleNavigate = () => {
    if (dealDaily) {
      navigate(`/${dealDaily.category}/${dealDaily._id}/${dealDaily.title}`);
    }
  };

  return (
    <div className="deal-container">
      {/* Tiêu đề DEAL DAILY */}
      <div className="deal-content">
        <span className="deal-icon1">
          <AiFillStar size={20} />
        </span>
        <span className="deal-text">DEAL DAILY</span>
        <span className="deal-icon2">
          <AiFillStar size={20} />
        </span>
      </div>

      {/* Hình ảnh sản phẩm */}
      <div className="deal-image-container" onClick={handleNavigate}>
        <img
          src={
            dealDaily?.thumb ||
            "https://apollobattery.com.au/wp-content/uploads/2022/08/default-product-image.png"
          }
          alt="Deal Daily Product"
          className="deal-image"
        />
        <h3 className="product-title1">{dealDaily?.title || "Sản phẩm đặc biệt"}</h3>

        {/* Hiển thị đánh giá sao */}
        <div className="product-stars1">
          {renderStarFromNumber(dealDaily?.totalRating)}
        </div>

        {/* Giá sản phẩm */}
        <p className="product-price1">
          {dealDaily?.price ? `${formatPrice(dealDaily.price)} VND` : "Liên hệ"}
        </p>
      </div>

      {/* Countdown timer nằm ngang dưới giá */}
      <div className="countdown-container">
        <Countdown unit={"Hours"} number={hour} />
        <Countdown unit={"Minute"} number={minute} />
        <Countdown unit={"Seconds"} number={second} />
      </div>

      {/* Nút Options */}
      <div className="button-container-DD">
        <button className="custom-button-DD">
          <AiOutlineMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
};

export default DealDaily;
