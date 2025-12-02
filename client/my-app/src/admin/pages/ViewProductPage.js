import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:5000/api/product/${id}`);
      const data = await res.json();
      if (data.success) setProduct(data.product);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Đang tải...</p>;

  return (
    <div className="view-product">
      <h2>{product.title}</h2>
      <img src={product.images} alt={product.title} style={{ maxWidth: 300 }} />
      <p>Giá: {product.price} VNĐ</p>
      <p>Slug: {product.slug}</p>
    </div>
  );
};

export default ViewProductPage;
