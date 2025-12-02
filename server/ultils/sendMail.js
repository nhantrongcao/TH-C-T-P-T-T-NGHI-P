const nodemailer = require("nodemailer");
const asyncHandler=require('express-async-handler')
const sendMail = async ({ email, html, subject }) => {
    try {
        if (!email) {
            throw new Error("Email recipient is missing");
        }

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // false vì dùng TLS
            auth: {
                user: process.env.EMAIL_NAME, // Email gửi
                pass: process.env.EMAIL_APP_PASSWORD, // App password của Gmail
            },
        });

        let info = await transporter.sendMail({
            from: `"Shopphone" <${process.env.EMAIL_NAME}>`, // Đảm bảo email hợp lệ
            to: email, // Danh sách người nhận
            subject: subject, // Tiêu đề email
            html: html, // Nội dung HTML
        });

        console.log("Email sent successfully:", info.response);
        return { success: true, info };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: error.message };
    }
};

module.exports = sendMail;