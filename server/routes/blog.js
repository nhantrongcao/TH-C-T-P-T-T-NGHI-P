const router = require('express').Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const ctrls = require('../controllers/blog');
const uploader=require('../config/cloudinary.config')
// Lấy danh sách blog
router.get('/', ctrls.getBlogs);

// Tạo mới blog (chỉ Admin mới có quyền)
router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBlog);

// Cập nhật blog (chỉ Admin mới có quyền)
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.get('/one/:bid', ctrls.getBlog);

// Like blog (cần đăng nhập)
router.put('/like/:bid', [verifyAccessToken], ctrls.likeBlog);

// Dislike blog (cần đăng nhập)
router.put('/dislike/:bid', [verifyAccessToken], ctrls.dislikeBlog);
router.put('/image/:bid', [verifyAccessToken, isAdmin], uploader.single('image'), ctrls.uploadImagesBlog);

module.exports = router;
