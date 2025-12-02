import React from "react";
import "./Product.css"; // CSS để tạo kiểu cho sản phẩm
import labelImage from "../assets/label1.png";
import  SelectOption  from "./SelectOption/SelectOption";
import icons from "../ultils/icons";
import { renderStarFromNumber } from "../ultils/helper";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const {AiFillEye, AiOutlineMenu, BsFillSuitHeartFill} = icons

// Hàm format giá tiền có dấu chấm
const formatPrice = (price) => price.toLocaleString("vi-VN");

const Product = ({ productData }) => {
    return (
        <Link 
            to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${encodeURIComponent(productData?.title)}`} 
            className="product-container"
        >
            {/* Hiển thị hình ảnh sản phẩm */}
            <img
                src={productData?.thumb || "https://apollobattery.com.au/wp-content/uploads/2022/08/default-product-image.png"}
                alt={productData?.title}
                className="product-image"
            />

            {/* Thêm hình ảnh làm label góc phải */}
            <div className="product-label-img">
                <img src={labelImage} alt="Label" />
            </div>

            {/* Hiển thị các lựa chọn */}
            <div className="select-options-container">
                <SelectOption icon = {<AiFillEye />} />
                <SelectOption icon = {<AiOutlineMenu />}/>
                <SelectOption icon = {<BsFillSuitHeartFill />}/>
            </div>

            {/* Hiển thị tiêu đề sản phẩm */}
            <h3 className="product-title">{productData?.title}</h3>

            {/* Hiển thị sao */}
            <div className="product-stars">
                {renderStarFromNumber(productData?.totalRating)}
            </div>

            {/* Hiển thị giá sản phẩm */}
            <p className="product-price">
                {productData?.price ? `${formatPrice(productData.price)} VND` : "Liên hệ"}
            </p>
        </Link>
    );
};

export default Product;
