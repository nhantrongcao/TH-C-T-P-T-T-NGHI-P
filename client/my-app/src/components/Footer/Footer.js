import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            {/* Đăng ký nhận bản tin */}
            <div className="newsletter">
                <h2>SIGN UP TO NEWSLETTER</h2>
                <p>Subscribe now and receive weekly newsletter</p>
                <div className="newsletter-input">
                    <input type="email" placeholder="Email address" />
                    <button type="submit">
                        <i className="fas fa-envelope"></i>
                    </button>
                </div>
            </div>

            {/* Nội dung footer */}
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>ABOUT US</h3>
                    <p><strong>📍 Address:</strong>622/44 Nhất Chi Mai, Phường 13, Tân Bình, TPHCM</p>
                    <p><strong>📞 Phone:</strong>0347585566</p>
                    <p><strong>📧 Mail:</strong> SHOPPHONE@gmail.com</p>
                    <div className="social-icons">
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-pinterest"></i>
                        <i className="fab fa-google-plus"></i>
                        <i className="fab fa-linkedin"></i>
                        <i className="fab fa-discord"></i>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>INFORMATION</h3>
                    <ul>
                        <li>Typography</li>
                        <li>Gallery</li>
                        <li>Store Location</li>
                        <li>Today's Deals</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>WHO WE ARE</h3>
                    <ul>
                        <li>Help</li>
                        <li>Free Shipping</li>
                        <li>FAQs</li>
                        <li>Return & Exchange</li>
                        <li>Testimonials</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>#SHOPPHONE</h3>
                </div>
            </div>

            {/* Tags sản phẩm */}
            <div className="footer-tags">
                <h3>PRODUCT TAGS</h3>
                <p>10-20 | 100-200 | 20-50 | 200-300 | 300-400 | 400-500 | 50-100 | 500-600 | 600-700 | 700-800 | 800-900 | 900-1000 | Accessories | Acer</p>
            </div>
        </footer>
    );
};

export default Footer;
