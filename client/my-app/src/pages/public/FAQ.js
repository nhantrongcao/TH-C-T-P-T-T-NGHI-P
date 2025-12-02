import React from "react";
import "./FAQ.css";

const FAQ = () => {
    return (
        <div className="faq-container">
            <h1>Câu hỏi thường gặp</h1>
            <div className="faq-item">
                <h3>1. Tôi có thể đổi trả điện thoại trong bao lâu?</h3>
                <p>
                    Bạn có thể đổi trả sản phẩm trong vòng 7 ngày nếu sản phẩm bị lỗi kỹ thuật hoặc không đúng mô tả.
                </p>
            </div>
            <div className="faq-item">
                <h3>2. Thời gian giao hàng là bao lâu?</h3>
                <p>
                    Thời gian giao hàng dao động từ 1–3 ngày tùy khu vực. Đơn hàng ở nội thành thường nhận trong ngày.
                </p>
            </div>
            <div className="faq-item">
                <h3>3. Có được kiểm tra hàng trước khi thanh toán không?</h3>
                <p>
                    Có, bạn được kiểm tra hàng trước khi thanh toán để đảm bảo đúng sản phẩm và tình trạng hoạt động.
                </p>
            </div>
            <div className="faq-item">
                <h3>4. Tôi cần hỗ trợ thì liên hệ ở đâu?</h3>
                <p>
                    Bạn có thể gọi hotline 1800 1234 hoặc nhắn tin qua fanpage Facebook/Zalo của shop để được hỗ trợ nhanh chóng.
                </p>
            </div>
        </div>
    );
};

export default FAQ;

