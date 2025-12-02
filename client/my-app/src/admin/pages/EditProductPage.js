import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const EditProductPage = () => {
  const { pid } = useParams();
  const [form, setForm] = useState(null);
  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/product/${pid}`);
        setForm(res.data.product);
      } catch (error) {
        console.error("❌ Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProduct();
  }, [pid]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/product/${pid}`, form, {
        headers: { Authorization: `Bearer ${current.accessToken}` },
      });
      alert("✅ Sửa thành công!");
      navigate("/admin/product");
    } catch (err) {
      alert("❌ Sửa thất bại.");
      console.error(err);
    }
  };

  if (!form) return <p>Đang tải...</p>;

  return (
    <div className="form-container">
      <h2>Sửa sản phẩm</h2>
      <form onSubmit={handleUpdate}>
        <input
          placeholder="Tên sản phẩm"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Giá"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Danh mục"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <textarea
          placeholder="Mô tả"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default EditProductPage;
