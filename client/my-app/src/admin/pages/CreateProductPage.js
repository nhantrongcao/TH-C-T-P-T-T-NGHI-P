import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const CreateProductPage = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    brand: "",
  });
  const [images, setImages] = useState([]);
  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Bước 1: Tạo sản phẩm
      const productRes = await axios.post("/api/product", form, {
        headers: { Authorization: `Bearer ${current.accessToken}` },
      });

      const { _id: pid } = productRes.data.product;

      // Bước 2: Upload ảnh (nếu có)
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((img) => formData.append("images", img));

        await axios.put(`/api/product/uploadimage/${pid}`, formData, {
          headers: {
            Authorization: `Bearer ${current.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      alert("✅ Thêm sản phẩm thành công!");
      navigate("/admin/product");
    } catch (err) {
      console.error("❌ Thêm sản phẩm thất bại:", err);
      alert("❌ Thêm sản phẩm thất bại.");
    }
  };

  return (
    <div className="form-container">
      <h2>Thêm sản phẩm mới</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tên sản phẩm"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Giá"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          placeholder="Danh mục"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          placeholder="Thương hiệu"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          required
        />
        <textarea
          placeholder="Mô tả sản phẩm"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <button type="submit">Tạo sản phẩm</button>
      </form>
    </div>
  );
};

export default CreateProductPage;
