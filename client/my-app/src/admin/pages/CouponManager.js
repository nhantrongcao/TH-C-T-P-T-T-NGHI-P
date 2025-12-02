  import React, { useEffect, useState } from "react";
  import {
    apiCreateCoupon,
    apiDeleteCoupon,
    apiGetCoupons,
    apiUpdateCoupon,
  } from "../../apis/coupon";
  import { useSelector } from "react-redux";
  import "./CouponManager.css";

  const CouponManager = () => {
    const { current } = useSelector((state) => state.user);
    const [coupons, setCoupons] = useState([]);
    const [form, setForm] = useState({ name: "", discount: "", expiry: "" });
    const [editId, setEditId] = useState(null);

    const fetchCoupons = async () => {
      try {
        const res = await apiGetCoupons();
        // ✅ Backend trả về { success, coupon }, không phải "coupons"
        setCoupons(res.data?.coupon || []);
      } catch (error) {
        console.error("Lỗi tải danh sách coupon:", error);
      }
    };

    useEffect(() => {
      fetchCoupons();
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
      if (!form.name || !form.discount || !form.expiry) {
        return alert("❗Vui lòng nhập đầy đủ thông tin");
      }

      // Chuyển hạn sử dụng từ số ngày sang Date ISO
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + Number(form.expiry));
      const data = {
        name: form.name.toUpperCase(),
        discount: Number(form.discount),
        expiry: expiryDate,
      };

      try {
        if (editId) {
          await apiUpdateCoupon(editId, data, current?.accessToken);
          alert("✅ Cập nhật mã giảm giá thành công");
        } else {
          await apiCreateCoupon(data, current?.accessToken);
          alert("✅ Tạo mã giảm giá mới thành công");
        }

        setForm({ name: "", discount: "", expiry: "" });
        setEditId(null);
        fetchCoupons();
      } catch (err) {
        console.error("Lỗi tạo/cập nhật coupon:", err);
        alert("❌ Lỗi xử lý!");
      }
    };

    const handleEdit = (coupon) => {
      setEditId(coupon._id);
      const today = new Date();
      const expiry = new Date(coupon.expiry);
      const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

      setForm({
        name: coupon.name,
        discount: coupon.discount,
        expiry: diffDays.toString(),
      });
    };

    const handleDelete = async (cid) => {
      if (!window.confirm("Xác nhận xoá mã giảm giá?")) return;
      try {
        await apiDeleteCoupon(cid, current?.accessToken);
        alert("🗑️ Đã xoá thành công!");
        fetchCoupons();
      } catch (err) {
        console.error("Lỗi xoá coupon:", err);
      }
    };

    return (
      <div className="coupon-container">
        <h2 className="coupon-title">🎟️ Quản lý mã giảm giá</h2>

        <div className="coupon-form">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên mã (VD: SPRING2024)"
          />
          <input
            name="discount"
            value={form.discount}
            onChange={handleChange}
            type="number"
            placeholder="Phần trăm giảm (VD: 10)"
          />
          <input
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            type="number"
            placeholder="Hạn sử dụng (số ngày)"
          />
          <button onClick={handleSubmit}>
            {editId ? "Cập nhật mã" : "Thêm mã mới"}
          </button>
        </div>

        <div className="coupon-table">
          <h3>Danh sách mã giảm giá</h3>
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Giảm (%)</th>
                <th>Hết hạn</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.discount}%</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(c)}>
                      Sửa
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(c._id)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={4}>Chưa có mã giảm giá nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default CouponManager;
