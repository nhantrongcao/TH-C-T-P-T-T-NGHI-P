const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

// Tạo đơn hàng
const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const {
    products, // array: [{ product, count, color }]
    coupon,
    paymentMethod,
    isPaid,
    note,
    shippingAddress,
    deliveryMethod,
    paymentResult,
    total: frontendTotal
  } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ success: false, message: 'Giỏ hàng trống!' });
  }

  // Lấy lại thông tin giá sản phẩm từ DB để đảm bảo tính chính xác
  let total = 0;
  for (const item of products) {
    const prod = await Product.findById(item.product).select('price');
    if (!prod) continue;
    total += prod.price * item.count;
  }

  const createData = {
    products,
    total,
    orderBy: _id,
    paymentMethod: paymentMethod?.toUpperCase() || 'COD',
    isPaid: !!isPaid,
    note,
    shippingAddress,
    deliveryMethod: deliveryMethod || 'standard',
  };

  // Áp dụng mã giảm giá nếu có
  if (coupon) {
    const selectedCoupon = await Coupon.findOne({ code: coupon.toUpperCase() });
    if (!selectedCoupon) {
      return res.status(400).json({ success: false, message: 'Mã giảm giá không hợp lệ!' });
    }
    const discountAmount = (total * selectedCoupon.discount) / 100;
    total = Math.round((total - discountAmount) / 1000) * 1000;
    createData.total = total;
    createData.coupon = selectedCoupon._id;
  }

  // Thêm thông tin thanh toán nếu dùng PayPal
  if (paymentResult) {
    createData.paymentResult = {
      id: paymentResult.id,
      status: paymentResult.status,
      update_time: paymentResult.update_time,
      email_address: paymentResult.email_address,
    };
  }

  const rs = await Order.create(createData);

  // Xoá giỏ hàng
  await User.findByIdAndUpdate(_id, { cart: [] });

  return res.status(201).json({ success: !!rs, order: rs });
});

// Cập nhật trạng thái đơn hàng
const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;

  if (!status) throw new Error('Thiếu trạng thái đơn hàng');

  const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });

  return res.json({
    success: !!response,
    response: response || 'Có lỗi xảy ra'
  });
});

// Lấy đơn hàng của người dùng hiện tại
const getUserOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const response = await Order.find({ orderBy: _id })
    .populate('products.product', 'title price')
    .populate('coupon', 'code discount')
    .sort('-createdAt');

  return res.json({
    success: !!response,
    response: response || 'Không tìm thấy đơn hàng'
  });
});

// Lấy tất cả đơn hàng (admin)
const getOrder = asyncHandler(async (req, res) => {
  const response = await Order.find()
    .populate('orderBy', 'name email')
    .populate('products.product', 'title')
    .populate('coupon', 'code discount')
    .sort('-createdAt');

  return res.json({
    success: !!response,
    response: response || 'Không có đơn hàng nào'
  });
});

module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
  getOrder
};