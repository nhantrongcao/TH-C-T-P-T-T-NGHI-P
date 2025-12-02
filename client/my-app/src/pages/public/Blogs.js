import React from "react";
import "./Blogs.css";

const Blogs = () => {
    return (
        <div className="blogs-container">
            <div className="blog-post">
                <h2>iPhone 15 Pro Max có gì mới? Có đáng nâng cấp không?</h2>
                <p>
                    iPhone 15 Pro Max là chiếc flagship mới nhất của Apple với thiết kế khung titan siêu nhẹ, chip A17 Pro mạnh mẽ
                    và camera tele 5x mới. Ngoài ra, máy còn hỗ trợ cổng USB-C, giúp người dùng tiện lợi hơn trong việc sạc và truyền dữ liệu.
                    <br /><br />
                    Tuy nhiên, nếu bạn đang dùng iPhone 13 Pro trở lên, việc nâng cấp có thể không quá cần thiết. Nhưng nếu bạn yêu thích công nghệ mới nhất và hiệu năng vượt trội, iPhone 15 Pro Max chắc chắn là lựa chọn đáng cân nhắc.
                </p>
            </div>
            <div className="blog-post">
                <h2>5 mẹo tiết kiệm pin trên điện thoại Android hiệu quả</h2>
                <p>
                    Dù smartphone ngày càng mạnh mẽ, thời lượng pin vẫn là vấn đề khiến nhiều người dùng băn khoăn. Dưới đây là 5 mẹo đơn giản giúp bạn tiết kiệm pin hiệu quả:
                    <br /><br />
                    <strong>1.</strong> Giảm độ sáng màn hình và dùng chế độ tối.<br />
                    <strong>2.</strong> Tắt các kết nối không cần thiết như Bluetooth, GPS.<br />
                    <strong>3.</strong> Gỡ bỏ ứng dụng chạy nền không cần thiết.<br />
                    <strong>4.</strong> Dùng chế độ tiết kiệm pin của hệ thống.<br />
                    <strong>5.</strong> Cập nhật phần mềm thường xuyên để tối ưu hiệu suất.
                    <br /><br />
                    Thực hiện các mẹo này sẽ giúp thiết bị hoạt động mượt hơn và kéo dài thời gian sử dụng trong ngày.
                </p>
            </div>
        </div>
    );
};

export default Blogs;
