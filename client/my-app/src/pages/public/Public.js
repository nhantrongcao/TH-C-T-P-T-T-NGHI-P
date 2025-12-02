import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";

const Public = () => {
    return (
        <div className="container">
            <Header />
            <Navigation />
            <main className="content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Public;
