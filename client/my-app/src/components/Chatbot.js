import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./Chatbot.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const API_URL = `${process.env.REACT_APP_API_URI}/chatbot`;

    // Danh sách gợi ý câu hỏi
    const suggestions = [
        "Shop có khuyến mãi gì không?",
        "Sản phẩm nào đang giảm giá?",
        "Có sản phẩm nào mới không?",
        "Chính sách bảo hành thế nào?",
        "Thời gian giao hàng bao lâu?",
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = useCallback(async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setError("");

        try {
            const response = await axios.post(API_URL, { message: input });
            let botReply;

            if (response.data.products) {
                botReply = {
                    role: "bot",
                    text: (
                        <div className="product-list">
                            {response.data.products.map((p, index) => (
                                <div key={index} className="product-item">
                                    <p className="product-title">{p.title}</p>
                                    <p className="product-price">{p.price} VNĐ</p>
                                </div>
                            ))}
                        </div>
                    ),
                };
            } else if (response.data.discount_codes) {
                botReply = {
                    role: "bot",
                    text: (
                        <div className="discount-list">
                            {response.data.discount_codes.map((code, index) => (
                                <div key={index} className="discount-item">
                                    🎉 {code.code}: Giảm {code.discount}% - HSD: {code.expiry}
                                </div>
                            ))}
                        </div>
                    ),
                };
            } else if (response.data.comparison) {
                botReply = { role: "bot", text: response.data.comparison };
            } else {
                botReply = { role: "bot", text: response.data.reply };
            }

            setMessages((prev) => [...prev, botReply]);
        } catch (error) {
            console.error("Lỗi gửi tin nhắn:", error);
            setError("Không thể gửi tin nhắn. Vui lòng thử lại!");
        }
    }, [input, API_URL]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSendMessage();
    };

    // Khi nhấn vào gợi ý, nhập nó vào ô chat
    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
    };

    return (
        <div>
            <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faComments} size="2x" color="white" />
            </div>

            {isOpen && (
                <div className="chatbot">
                    <div className="chat-header">Chatbot Tư Vấn</div>
                    <div className="messages">
                        {/* Hiển thị danh sách gợi ý khi chat trống */}
                        {messages.length === 0 && (
                            <div className="suggestions">
                                <p className="suggestion-title">Bạn có thể hỏi:</p>
                                {suggestions.map((sug, index) => (
                                    <button key={index} className="suggestion-btn" onClick={() => handleSuggestionClick(sug)}>
                                        {sug}
                                    </button>
                                ))}
                            </div>
                        )}

                        {messages.map((msg, index) => (
                            <div key={index} className={msg.role === "bot" ? "bot-message" : "user-message"}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Nhập tin nhắn..."
                        />
                        <button onClick={handleSendMessage}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
