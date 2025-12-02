const mongoose = require('mongoose');

// Định nghĩa Schema cho Blog
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numberViews: { // Sửa lỗi lặp từ "Views"
        type: Number,
        default: 0
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isDisliked: {
        type: Boolean,
        default: false
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{ // Sửa lỗi "disdislikes" -> "dislikes"
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    image: {
        type: String,
        default: 'https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430879.jpg'
    },
    author: {
        type: String,
        default: 'Admin'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

module.exports = mongoose.model('Blog', blogSchema);
