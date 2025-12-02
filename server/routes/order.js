// routes/order.js
const router = require('express').Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const ctrls = require('../controllers/order');

router.post('/', verifyAccessToken, ctrls.createOrder);
router.put('/status/:oid', verifyAccessToken, isAdmin, ctrls.updateStatus);
router.get('/', verifyAccessToken, ctrls.getUserOrder); // 👉 user orders
router.get('/admin', verifyAccessToken, isAdmin, ctrls.getOrder); // 👉 admin orders

module.exports = router;
