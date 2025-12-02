import React, { useState, useEffect } from "react";
import { apiGetProducts } from "../apis/product";
import Product from "./Product";
import "./BestSeller.css"; // Import CSS mới

const tabs = [
    { id: 1, name: "Best Seller" },
    { id: 2, name: "New Arrivals" },
];

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [activedTab, setActivedTab] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0); // Để theo dõi index của slide hiện tại

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [bestSellerRes, newProductRes] = await Promise.all([
                    apiGetProducts({ sort: "-sold" }),
                    apiGetProducts({ sort: "-createdAt" }),
                ]);

                if (bestSellerRes?.success) setBestSellers(bestSellerRes.products || []);
                if (newProductRes?.success) setNewProducts(newProductRes.products || []);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
            }
        };

        fetchProducts();
    }, []);

    const displayedProducts = activedTab === 1 ? bestSellers : newProducts;

    // Tự động chuyển slide sau mỗi 2 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(displayedProducts.length / 4));
        }, 2000);

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, [displayedProducts]);

    // Tính toán sản phẩm hiển thị cho mỗi slide
    const getSlideProducts = () => {
        const startIndex = currentIndex * 4;
        return displayedProducts.slice(startIndex, startIndex + 4);
    };

    return (
        <div className="bestseller-container">
            {/* Tabs */}
            <div className="tabs-container">
                {tabs.map((el) => (
                    <span
                        key={el.id}
                        onClick={() => setActivedTab(el.id)}
                        className={`tab-item ${activedTab === el.id ? "active" : ""}`}
                    >
                        {el.name}
                    </span>
                ))}
            </div>

            {/* Slider sản phẩm */}
            <div className="slider-container">
                {getSlideProducts().map((el) => (
                    <Product key={el._id} productData={el} />
                ))}
            </div>
            <div className="banner14-container">
            <img
                src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                alt="banner"
                className="banner11-image"
            />
            <img
                src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                alt="banner"
                className="banner12-image"
            />
            </div>
        </div>
    );
};

export default BestSeller;
