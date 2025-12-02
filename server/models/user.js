const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const crypto = require('crypto'); 

// Schema định nghĩa User
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
            quantity: Number,
            color: String
        }
    ],
    address: String,
    wishlist: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    isBlocked: { type: Boolean, default: false },
    refreshToken: { type: String },
    passwordChangedAt: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },

    //  Thêm trạng thái tài khoản và token kích hoạt
    verificationToken: { type: String }, // Token xác thực
    isActivated: { type: Boolean, default: false } // Trạng thái tài khoản
}, {
    timestamps: true
});

// Hash mật khẩu trước khi lưu vào database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Phương thức kiểm tra mật khẩu
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Phương thức tạo token reset mật khẩu
userSchema.methods.createPasswordChangedToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex"); 
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000; // Hết hạn sau 15 phút
    return resetToken;
};

// Xuất model
module.exports = mongoose.model('User', userSchema);