const router = require('express').Router();
const ctrls = require('../controllers/product');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');

// Tạo sản phẩm
router.post('/', [verifyAccessToken, isAdmin], ctrls.createProduct);

// Lấy danh sách sản phẩm
router.get('/', ctrls.getProducts);

// Đánh giá sản phẩm
router.put('/ratings', verifyAccessToken, ctrls.ratings);

// Upload ảnh sản phẩm
router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 10), ctrls.uploadImagesProduct);

// Cập nhật sản phẩm
router.put('/:pid([0-9a-fA-F]{24})', [verifyAccessToken, isAdmin], ctrls.updateProduct);

// Xoá sản phẩm
router.delete('/:pid([0-9a-fA-F]{24})', [verifyAccessToken, isAdmin], ctrls.deleteProduct);

// Lấy chi tiết sản phẩm theo ID
router.get('/:pid([0-9a-fA-F]{24})', ctrls.getProduct);

// (Tùy chọn) Thêm route này nếu muốn dùng slug
// router.get('/slug/:slug', ctrls.getProductBySlug);

module.exports = router;
