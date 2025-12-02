const Coupon = require('../models/coupon');

// Tạo mã giảm giá mới
exports.createNewCoupon = async (req, res) => {
  try {
    const { name, discount, expiry } = req.body;
    if (!name || !discount || !expiry) {
      return res.status(400).json({ success: false, message: "Thiếu thông tin bắt buộc!" });
    }

    const existingCoupon = await Coupon.findOne({ name });
    if (existingCoupon) {
      return res.status(409).json({ success: false, message: "Mã giảm giá đã tồn tại!" });
    }

    const coupon = await Coupon.create({ name, discount, expiry });
    return res.status(201).json({ success: true, message: "Tạo mã thành công", coupon });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Lỗi server: " + err.message });
  }
};

// Cập nhật mã giảm giá
exports.updateCoupon = async (req, res) => {
  try {
    const updated = await Coupon.findByIdAndUpdate(req.params.cid, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Không tìm thấy mã" });
    return res.json({ success: true, message: "Cập nhật thành công", coupon: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Lỗi server: " + err.message });
  }
};

// Xoá mã giảm giá
exports.deleteCoupon = async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.cid);
    if (!deleted) return res.status(404).json({ success: false, message: "Không tìm thấy mã" });
    return res.json({ success: true, message: "Xóa thành công" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Lỗi server: " + err.message });
  }
};

// Lấy danh sách mã giảm giá
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return res.json({ success: true, coupons });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Lỗi server: " + err.message });
  }
};

// Áp dụng mã giảm giá (cho backend tính toán)
exports.applyCoupon = async (req, res) => {
  try {
    const { couponCode } = req.body;
    if (!couponCode) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập mã giảm giá" });
    }

    const coupon = await Coupon.findOne({ name: couponCode.trim() });
    if (!coupon || new Date(coupon.expiry) < new Date()) {
      return res.status(400).json({ success: false, message: "Mã không hợp lệ hoặc đã hết hạn" });
    }

    return res.json({ success: true, coupon });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Lỗi server: " + err.message });
  }
};

// Kiểm tra mã giảm giá (cho frontend kiểm tra nhanh)
exports.validateCoupon = async (req, res) => {
  try {
    const code = req.params.code?.trim();
    if (!code) return res.json({ success: false });

    const coupon = await Coupon.findOne({ name: code });
    if (!coupon || new Date(coupon.expiry) < new Date()) {
      return res.json({ success: false });
    }

    return res.json({ success: true, coupon });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
};
