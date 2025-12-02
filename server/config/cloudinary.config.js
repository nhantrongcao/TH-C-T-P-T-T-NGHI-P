const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

// Cấu hình bộ lưu trữ Multer + Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "shopphone", // Thư mục trên Cloudinary
        allowedFormats: ["jpg", "png"],
        format: async (req, file) => "png", // Định dạng ảnh
        public_id: (req, file) => file.shopphone, // Tên file trên Cloudinary
    },
});

// Middleware upload
const uploadCloud = multer({ storage });

module.exports = uploadCloud;
