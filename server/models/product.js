const mongoose = require('mongoose');

// Khai báo Schema cho Product
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      //unique: true,
      lowercase: true
    },
    description: {
      type: Array,
      required: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    thumb: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0 // ✅ Giá không thể âm
    },
    category: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    sold: {
      type: Number,
      default: 0
    },
    images: {
      type: Array,
      require: true
    },
    color: {
      type: String,
      enum: ['Black', 'White', 'Blue', 'Red', 'Green', 'Silver', 'Gold'], // ✅ Bổ sung thêm màu phổ biến
      default: 'Black'
    },
    warranty: {
      type: String,
      default: '12 months' // ✅ Bảo hành mặc định 12 tháng
    },
    ratings: [
      {
        star: {
          type: Number,
          min: 1,
          max: 5
        },
        postedBy: {
          type: mongoose.Types.ObjectId,
          ref: 'User'
        },
        comment: {
          type: String,
          trim: true
        }
      }
    ],
    totalRating: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Available', 'Out of Stock', 'Discontinued'], // ✅ Trạng thái sản phẩm
      default: 'Available'
    },
    discount: {
      type: Number,
      default: 0, // ✅ Giảm giá % (nếu có)
      min: 0,
      max: 100
    },
    views: {
      type: Number,
      default: 0 // ✅ Theo dõi lượt xem sản phẩm
    },
    featured: {
      type: Boolean,
      default: false // ✅ Đánh dấu sản phẩm nổi bật
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
