const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) throw new Error('Missing inputs');
    const response = await Blog.create(req.body);
    return res.json({
        success: response ? true : false,
        createdBlog: response || 'Cannot create new blog'
    });
});

const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
    return res.json({
        success: response ? true : false,
        updatedBlog: response || 'Cannot update blog'
    });
});

const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find();
    return res.json({
        success: response ? true : false,
        blogs: response || 'Cannot get blogs'
    });
});

/*
Khi người dùng like một bài blog:
1. Nếu đã dislike trước đó → Bỏ dislike
2. Nếu đã like trước đó → Bỏ like
3. Nếu chưa like → Thêm like
*/
const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.body;
    if (!bid) throw new Error('Missing inputs');

    const blog = await Blog.findById(bid);
    if (!blog) throw new Error('Blog not found');

    // Nếu đã dislike trước đó, bỏ dislike
    if (blog.dislikes.includes(_id)) {
        await Blog.findByIdAndUpdate(
            bid,
            { $pull: { dislikes: _id }, isDisliked: false },
            { new: true }
        );
    }

    // Nếu đã like trước đó, bỏ like
    if (blog.likes.includes(_id)) {
        const response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { likes: _id }, isLiked: false },
            { new: true }
        );
        return res.json({ success: true, rs: response });
    }

    // Nếu chưa like, thêm like
    const response = await Blog.findByIdAndUpdate(
        bid,
        { $push: { likes: _id }, isLiked: true },
        { new: true }
    );
    return res.json({ success: true, rs: response });
});

/*
Khi người dùng dislike một bài blog:
1. Nếu đã like trước đó → Bỏ like
2. Nếu đã dislike trước đó → Bỏ dislike
3. Nếu chưa dislike → Thêm dislike
*/
const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.body;
    if (!bid) throw new Error('Missing inputs');

    const blog = await Blog.findById(bid);
    if (!blog) throw new Error('Blog not found');

    // Nếu đã like trước đó, bỏ like
    if (blog.likes.includes(_id)) {
        await Blog.findByIdAndUpdate(
            bid,
            { $pull: { likes: _id }, isLiked: false },
            { new: true }
        );
    }

    // Nếu đã dislike trước đó, bỏ dislike
    if (blog.dislikes.includes(_id)) {
        const response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { dislikes: _id }, isDisliked: false },
            { new: true }
        );
        return res.json({ success: true, rs: response });
    }

    // Nếu chưa dislike, thêm dislike
    const response = await Blog.findByIdAndUpdate(
        bid,
        { $push: { dislikes: _id }, isDisliked: true },
        { new: true }
    );
    return res.json({ success: true, rs: response });
});
const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!bid) throw new Error("Missing blog ID");

    const response = await Blog.findById(bid);
    if (!response) throw new Error("Blog not found");

    return res.json({
        success: true,
        blog: response,
    });
});

const uploadImagesBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params; // Lấy id của blog từ params
    if (!req.file) throw new Error("Missing input"); // Chỉ kiểm tra req.file vì chỉ upload 1 ảnh

    const response = await Blog.findByIdAndUpdate(
        bid,
        { image: req.file.path }, // Chỉ lưu 1 ảnh
        { new: true } // Trả về dữ liệu sau khi cập nhật
    );

    return res.json({
        success: response ? true : false,
        updatedBlog: response || "Cannot upload image",
    });
});


module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    getBlog,
    likeBlog,
    dislikeBlog,
    uploadImagesBlog
};
