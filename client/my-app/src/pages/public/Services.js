import React from "react";
import "./Services.css";

const Services = () => {
    return (
        <div className="services-container">
            <h1>Dịch vụ của chúng tôi</h1>
            <div className="service-list">
                <div className="service-item">
                    <h2>Sửa chữa điện thoại</h2>
                    <p>
                        Chúng tôi cung cấp dịch vụ sửa chữa điện thoại uy tín, thay màn hình, pin, camera với linh kiện chính hãng.
                    </p>
                </div>
                <div className="service-item">
                    <h2>Bảo hành chính hãng</h2>
                    <p>
                        Tất cả sản phẩm đều được bảo hành theo tiêu chuẩn của nhà sản xuất. Hỗ trợ đổi trả nhanh chóng trong 7 ngày.
                    </p>
                </div>
                <div className="service-item">
                    <h2>Giao hàng toàn quốc</h2>
                    <p>
                        Giao hàng tận nơi trên toàn quốc, miễn phí vận chuyển cho đơn hàng từ 1 triệu đồng.
                    </p>
                </div>
                <div className="service-item">
                    <h2>Tư vấn chọn điện thoại</h2>
                    <p>
                        Đội ngũ nhân viên giàu kinh nghiệm luôn sẵn sàng tư vấn cho bạn lựa chọn sản phẩm phù hợp nhất với nhu cầu.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Services;

