const router = require('express').Router();
const ctrls = require('../controllers/brand');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

// Tạo thương hiệu (chỉ admin)
router.post('/', [verifyAccessToken, isAdmin], ctrls.createBrand);

// Lấy danh sách thương hiệu
router.get('/', ctrls.getBrands);

// Cập nhật thương hiệu (chỉ admin)
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBrand);

// Xóa thương hiệu (chỉ admin)
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBrand);

module.exports = router;
