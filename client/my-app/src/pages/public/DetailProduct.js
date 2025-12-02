import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProduct } from '../../apis/product';
import Breadcrumb from '../../components/Breadcrumb';
import SelectQuantity from '../../components/SelectQuantity';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './DetailProduct.css';
import { renderStarFromNumber } from "../../ultils/helper";
import { Button } from '../../components';
import { FaShoppingCart } from 'react-icons/fa';
import ProductExtraInfoItem from '../../components/ProductExtraInfoItem';
import { productExtraInformation } from '../../ultils/contants';
import ProductInformation from '../../components/ProductInformation';
import { addToCart } from '../../ultils/addToCart';
import Toast from "../../components/Toast"; // ✅ import toast

const formatPrice = (price) => {
    if (price === undefined || price === null) {
        return "Chưa có giá";
    }
    return price.toLocaleString("vi-VN");
};

const DetailProduct = () => {
    const { pid, title, category } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(null);
    const [showToast, setShowToast] = useState(false); // ✅ toast control

    const fetchProductData = async () => {
        const response = await apiGetProduct(pid);
        if (response.success) {
            setProduct(response.productData);
            setMainImage(response.productData.images?.[0]);
        }
    };

    useEffect(() => {
        if (pid) fetchProductData();
    }, [pid]);

    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) return;
        setQuantity(number);
    }, []);

    const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) return;
        if (flag === 'minus') setQuantity(prev => +prev - 1);
        if (flag === 'plus') setQuantity(prev => +prev + 1);
    }, [quantity]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, quantity);
        setShowToast(true); // ✅ hiện toast
    };

    return (
        <div>
            {showToast && (
                <Toast message="🛒 Đã thêm vào giỏ hàng!" onClose={() => setShowToast(false)} />
            )}

            <div>
                <h3 className="tensanpham">{title}</h3>
                <Breadcrumb title={title} category={category} />
            </div>

            <div className="product-detail12">
                <div className="product-image12">
                    <Zoom>
                        <img
                            src={mainImage}
                            alt="main-product"
                            style={{
                                width: '458px',
                                height: '458px',
                                objectFit: 'cover',
                                borderRadius: '8px'
                            }}
                        />
                    </Zoom>
                    <div className="sub-images12">
                        {product?.images?.slice(0, 5).map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`sub-${idx}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-price12">
                    <h2 className="price-info">{formatPrice(product?.price)} VNĐ</h2>
                    <div className="rating-info">{renderStarFromNumber(product?.totalRating)}</div>
                    <ul className='list-item'>
                        {product?.description?.map(el => (<li key={el}>{el}</li>))}
                    </ul>
                    <span className="quantity-info">
                        Số lượng trong kho: {product?.quantity} || Đã bán: {product?.sold}
                    </span>
                    <div>
                        <SelectQuantity
                            quantity={quantity}
                            handleQuantity={handleQuantity}
                            handleChangeQuantity={handleChangeQuantity}
                        />
                        <Button
                            name="THÊM VÀO GIỎ HÀNG"
                            handleOnClick={handleAddToCart}
                            style="add-to-cart-btn"
                            iconsBefore={<FaShoppingCart />}
                        />
                    </div>
                </div>

                <div className="product-info">
                    {productExtraInformation.map(el => (
                        <ProductExtraInfoItem
                            key={el.id}
                            title={el.title}
                            icon={el.icon}
                            sub={el.sub}
                        />
                    ))}
                </div>
            </div>

            <ProductInformation />
            <div className="ma-fo"></div>
        </div>
    );
};

export default DetailProduct;
