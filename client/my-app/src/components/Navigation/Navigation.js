import React, { useState } from "react";
import "./Navigation.css";
import { navigation } from "../../ultils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Tìm kiếm:", searchTerm);
        // Chỗ này có thể dẫn sang trang tìm kiếm hoặc xử lý tuỳ ý
    };

    return (
        <nav className="navigation">
            <div className="nav-links">
                {navigation.map((el) => (
                    <NavLink
                        to={el.path}
                        key={el.id}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        {el.value}
                    </NavLink>
                ))}
            </div>

            {/* Ô tìm kiếm */}
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Search something..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button type="submit"></button>
            </form>
            <div className="profile-icon">
                    <a href="#">
                        <i className="fas fa-user-circle"></i> Profile
                    </a>
                </div>
        </nav>
    );
};

export default Navigation;
