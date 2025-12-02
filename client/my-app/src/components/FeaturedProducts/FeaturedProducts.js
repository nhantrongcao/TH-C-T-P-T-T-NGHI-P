import React, { useState, useEffect } from "react";
import "./FeaturedProducts.css";
import ProductCard from "../ProductCard/ProductCard";
import { apiGetProducts } from "../../apis/product";

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, totalRating: 5 });
    if (response.success) setProducts(response.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="feature-container">
      <h3 className="feature-title">FEATURED PRODUCTS</h3>
      <div className="product-grid">
        {products?.map((el) => (
          <ProductCard
  key={el._id}
  pid={el._id}
  image={el.thumb}
  title={el.title}
  totalRating={el.totalRating}
  price={el.price}
  category={el.category}
/>
        ))}
      </div>
      <div class="image-container-featured">
    <img class="img1" src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661" alt="Hình 1" />
    <img class="img2" src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661" alt="Hình 2" />
    <img class="img3" src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661" alt="Hình 3" />
    <img class="img4" src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661" alt="Hình 4" />
</div>


    </div>
  );
};

export default FeatureProducts;
