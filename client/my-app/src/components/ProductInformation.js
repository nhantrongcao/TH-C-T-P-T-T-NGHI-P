import React, { memo, useState } from "react";
import { productInfoTabs } from "../ultils/contants";
import './ProductInformation.css'; 

const ActivedStyle = 'tab-active';
const notActivedStyle = 'tab-inactive';

const ProductInformation = () => {
    const [activedTab, setActivedTab] = useState(1);

    return (
        <div>
            <div className="product-infoma">
                {productInfoTabs.map(el => (
                    <span
                        key={el.id}
                        onClick={() => setActivedTab(el.id)}
                        className={activedTab === el.id ? ActivedStyle : notActivedStyle}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div
                key={activedTab}  // ⚠️ rất quan trọng để re-render lại div này khi tab thay đổi
                className="product-infoma1"
            >
            {
                productInfoTabs.find(el => el.id === activedTab)?.content
            }
            </div>
        </div>
    );
};

export default memo(ProductInformation);
