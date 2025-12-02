const axios = require('axios');
const Product = require('../models/product'); // Import model sản phẩm
const Discount = require('../models/coupon'); // Import model mã giảm giá

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Controller để xử lý tin nhắn của người dùng
const chatWithBot = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message không được bỏ trống' });
        }

        let botResponse = '';

        // 1️⃣ Xử lý yêu cầu tư vấn sản phẩm 
        if (message.toLowerCase().includes("so sánh")) {
            const phones = await Product.find({});
            if (phones.length === 0) {
                botResponse = "Hiện tại không có sản phẩm nào để so sánh.";
            } else {
                botResponse = `Danh sách điện thoại có sẵn:\n` +
                    phones.map(p => {
                        return `${p.title} - Giá: ${p.price}đ` ;
                    }).join("\n\n");
            }
        }
        // 2️⃣ Xử lý yêu cầu về mã giảm giá
        else if (message.toLowerCase().includes("mã giảm giá")) {
            const discounts = await Discount.find({});
            if (discounts.length === 0) {
                botResponse = "Hiện tại không có mã giảm giá nào.";
            } else {
                botResponse = `Các mã giảm giá hiện có: ${discounts.map(d => `${d.name} - Giảm ${d.discount}%`).join(", ")}`;
            }
        }
        // 3️⃣ Xử lý yêu cầu về vấn đề "không lấy ảnh lên được"
        else if (message.toLowerCase().includes("không lấy ảnh lên được")) {
            botResponse = `
Chào bạn,

Về vấn đề bạn hỏi "không lấy ảnh lên được hả b", tôi cần thêm thông tin để hiểu rõ hơn bạn đang gặp vấn đề cụ thể nào. Để tôi có thể tư vấn tốt nhất, bạn vui lòng cho biết thêm:

*   **Bạn đang muốn lấy ảnh lên từ đâu?** (Ví dụ: từ điện thoại lên máy tính, từ điện thoại lên mạng xã hội, từ điện thoại vào ứng dụng chỉnh sửa ảnh, v.v.)
*   **Bạn đang dùng điện thoại gì?** (Ví dụ: iPhone, Samsung, Xiaomi, v.v.)
*   **Bạn đã thử những cách nào rồi?**
*   **Bạn có nhận được thông báo lỗi nào không?**

Khi có đầy đủ thông tin, tôi sẽ cố gắng hỗ trợ bạn giải quyết vấn đề một cách nhanh chóng và hiệu quả.
            `;
        }
        // 4️⃣ Nếu không có trong CSDL, gửi yêu cầu đến Gemini
        else {
            const response = await axios.post(GEMINI_API_URL, {
                contents: [{ parts: [{ text: `Chỉ tư vấn về điện thoại di động và mã giảm giá. Câu hỏi: ${message}` }] }]
            });
            botResponse = response.data.candidates[0].content.parts[0].text;
        }

        res.json({ reply: botResponse });
    } catch (error) {
        console.error('Lỗi API:', error.response?.data || error.message);
        res.status(500).json({ error: 'Lỗi khi xử lý yêu cầu' });
    }
};

module.exports = {
    chatWithBot
};
