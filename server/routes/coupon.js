const router = require('express').Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const ctrls = require('../controllers/coupon');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewCoupon);
router.put('/:cid', [verifyAccessToken, isAdmin], ctrls.updateCoupon);
router.delete('/:cid', [verifyAccessToken, isAdmin], ctrls.deleteCoupon);
router.get('/', ctrls.getCoupons);

// ✅ Áp dụng mã giảm giá
router.post('/apply', verifyAccessToken, ctrls.applyCoupon);

// ✅ Kiểm tra mã giảm giá (cho frontend)
router.get('/validate/:code', ctrls.validateCoupon);

module.exports = router;
