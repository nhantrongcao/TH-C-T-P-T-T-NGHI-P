import React, { useState, useEffect } from "react";
import "./Baner.css"; 

// Chỉ định đúng đường dẫn ảnh
const slides = [
    {
        title: "ACCESSORIES",
        subtitle: "Sale upto 20%",
        description: "Lorem Ipsum proin gravida nibh vel velit auctor aliquet.",
        img: "https://inaniprint.com/wp-content/uploads/2021/09/mau-thiet-ke-poster-iphone13-iphone13promax-1-400x400.jpg", // Hình ảnh điện thoại 1
    },
    {
        title: "ELECTRONICS",
        subtitle: "Sale upto 30%",
        description: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
        img: "https://img.meta.com.vn/data/image/2022/12/22/dien-thoai-chup-anh-dep-2.jpg", // Hình ảnh điện thoại 2
    },
    {
        title: "CLOTHING",
        subtitle: "Sale upto 50%",
        description: "Duis lobortis massa imperdiet quam. Etiam ultricies nisi vel augue.",
        img: "https://4.bp.blogspot.com/-5ceNaBYMu8Q/WyIkQpvzd_I/AAAAAAAAC_g/X05QEhY8uk8VJ-pQgu7UB8A5LGB3NEbogCLcBGAs/s1600/dien-thoai-nokia-2-hang-chinh-hang.jpg", // Hình ảnh điện thoại 3
    },
];

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Thay đổi mỗi 5 giây

        return () => clearInterval(slideInterval); // Dọn dẹp khi component unmount
    }, []);

    const { title, subtitle, description, img } = slides[currentSlide];

    return (
        <section className="banner">
            <div className="banner-content">
                <h4>{title}</h4>
                <h2>{subtitle}</h2>
                <p>{description}</p>
                <button>Shop now</button>
            </div>
            <div className="banner-image">
                <img src={img} alt={title} />
            </div>
        </section>
    );
};

export default Banner;
