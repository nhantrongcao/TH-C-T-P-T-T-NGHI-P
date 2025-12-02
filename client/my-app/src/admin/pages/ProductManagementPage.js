import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductManagementPage.css";

import { apiGetProducts, apiDeleteProduct } from "../../apis/product";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/product");
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error("Không lấy được danh sách sản phẩm");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

   const handleDelete = async (pid) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");
    if (!confirm) return;

    try {
      const res = await apiDeleteProduct(pid);
      if (res.data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== pid));
      } else {
        alert("❌ Xoá thất bại");
      }
    } catch (err) {
      alert("❌ Lỗi khi xoá sản phẩm");
      console.error(err);
    }
  };
  return (
    <div className="admin-container">
      <div className="header">
        <h2>Quản lý sản phẩm ({products.length})</h2>
        <Link to="/admin/product/create" className="btn add-btn">
          + Thêm sản phẩm
        </Link>
      </div>

      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Slug</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>
                  <img
                    src={
                      Array.isArray(product.images) && product.images.length > 0
                        ? product.images[0]
                        : "https://via.placeholder.com/60"
                    }
                    alt={product.title}
                    style={{ width: "60px", borderRadius: "4px" }}
                  />
                </td>
                <td>{product.slug || "Chưa có"}</td>
                <td>
                  <Link to={`/admin/product/view/${product._id}`} className="btn view">Xem</Link>
                  <Link to={`/admin/product/edit/${product._id}`} className="btn edit">Sửa</Link>
                  <button onClick={() => handleDelete(product._id)} className="btn delete">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductManagement;
