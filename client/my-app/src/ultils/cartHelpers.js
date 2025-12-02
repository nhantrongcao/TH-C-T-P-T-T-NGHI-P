import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// ✅ Định dạng giá tiền Việt Nam
export const formatPrice = (price) => {
    if (!price || isNaN(price)) return "0 đ";
    return price.toLocaleString("vi-VN") + " đ";
};

// ✅ Rút gọn tên sản phẩm nếu quá dài
export const shortenTitle = (title, maxLength = 50) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
};

// ✅ Tính tổng tiền toàn bộ giỏ hàng
export const getCartTotal = (cart = []) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

// ✅ Gộp các sản phẩm trùng nhau (nếu cần)
export const mergeCartItems = (cart = []) => {
    const merged = {};
    cart.forEach(item => {
        if (merged[item._id]) {
            merged[item._id].quantity += item.quantity;
        } else {
            merged[item._id] = { ...item };
        }
    });
    return Object.values(merged);
};

// ✅ Hiển thị số sao từ đánh giá (có thể dùng trong cart nếu có rating)
export const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
        stars.push(<AiFillStar key={`star-${i}`} className="filled-star" />);
    }
    for (let i = fullStars; i < 5; i++) {
        stars.push(<AiOutlineStar key={`star-outline-${i}`} className="outline-star" />);
    }
    return stars;
};
