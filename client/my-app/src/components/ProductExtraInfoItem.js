import React, { memo } from 'react';
import './ProductExtraInfoItem.css'; // import file CSS riêng

const ProductExtraInfoItem = ({ icon, title, sub }) => {
    return (
        <div className="info-item">
            <span className="info-icon">{icon}</span>
            <div className="info-text">
                <span className="info-title">{title}</span>
                <span>{sub}</span>
            </div>
        </div>
    );
};

export default memo(ProductExtraInfoItem);
