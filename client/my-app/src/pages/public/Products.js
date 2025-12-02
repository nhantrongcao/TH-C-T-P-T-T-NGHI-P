import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Product from '../../components/Product';
import { apiGetProducts } from '../../apis';
import './Products.css';
import ProductCard1 from "../../components/ProductCard1";
import SearchItem from "../../components/SearchItem";



const Products = () => {
  const [products, setProducts] = useState([]);
  const [activeClick, setActiveClick] = useState(null)
  const { category } = useParams();

  const fetchProductsByCategory = async (queries) => {
    console.log('Received queries in API:', queries);
    const response = await apiGetProducts(queries);
    console.log('API response:', response);

    if (response.success && Array.isArray(response.products)) {
      setProducts(response.products);
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    if (category) {
      const formattedCategory =
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

      console.log('Formatted category:', formattedCategory);
      fetchProductsByCategory({ category: formattedCategory });
    }
  }, [category]);
  const changeActiveFitler = useCallback ((name) => {
     if (activeClick === name) setActiveClick(null)
      else setActiveClick(name)
  },[activeClick])
  return (
    <div className="products-container">
      {/* Tiêu đề và Breadcrumb */}
      <div className="products-header">
        <div className="products-title-container">
          <h3 className="products-title">{category}</h3>
          <Breadcrumb category={category} />
        </div>
      </div>

      {/* Bộ lọc và sắp xếp */}
      <div className="products-toolbar">
        <div>
            <div className="filter">
                <SearchItem
                    name= 'price'
                    activeClick={activeClick}
                    changeActiveFitler={changeActiveFitler}            
                />
                <SearchItem
                    name= 'color'
                    activeClick={activeClick}
                    changeActiveFitler={changeActiveFitler}            
                />
            </div>    
        </div>
        <div className="sort-by">Sort by</div>
      </div>

      {/* Nội dung sản phẩm */}
      <div className="products-content">
        {products.length > 0 ? (
          <div className="products-grid">
          {products?.map((el) => (
            <ProductCard1
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
        ) : (
          <p>Không có sản phẩm nào trong danh mục này.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
