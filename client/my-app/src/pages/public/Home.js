import React from "react";
import "./home.css";
import { Sidebar, Banner, BestSeller, DealDaily, FeaturedProducts, Footer } from "../../components";

const Home = () => {
    return (
        <>
            <div className="w-main">
                <div className="home-layout">
                    {/* Sidebar chiếm bên trái */}
                    <div className="left-column">
                        <Sidebar />
                        <DealDaily />
                    </div>
                    <div className="right-column">
                        <Banner />
                        <BestSeller />
                    </div>
                </div>
                <div className="FeaturedProducts-layout">
                    <FeaturedProducts />
                </div>
            </div>
        </>
    );
};

export default Home;
