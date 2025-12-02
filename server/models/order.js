const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
      count: { type: Number, required: true },
      color: { type: String, required: true },
    },
  ],
  status: {
    type: String,
    default: 'Processing',
    enum: ['Cancelled', 'Processing', 'Succeed'],
  },
  total: {
    type: Number,
    required: true,
  },
  coupon: { type: mongoose.Types.ObjectId, ref: 'Coupon' },
  orderBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  paymentMethod: {
    type: String,
    default: 'COD',
    enum: ['COD', 'PAYPAL'],
  },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  deliveredAt: { type: Date },
  shippingAddress: { type: String, required: true },
  note: { type: String },
  deliveryMethod: {
    type: String,
    default: 'standard',
    enum: ['standard', 'express'],
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
