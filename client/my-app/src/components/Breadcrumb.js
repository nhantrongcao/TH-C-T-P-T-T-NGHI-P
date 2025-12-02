import React from 'react';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import './Breadcrumb.css';

const Breadcrumb = ({ title, category }) => {
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:pid/:title", breadcrumb: title },
    ];
    const breadcrumb = useBreadcrumbs(routes);
    console.log(breadcrumb);

    // Lọc các breadcrumb ở vị trí 0, 1 và 3
    const filteredBreadcrumbs = breadcrumb?.filter((_, index) => index === 0 || index === 1 || index === 3);

    return (
        <div className="text-sm">
            {filteredBreadcrumbs?.map(({ match, breadcrumb }) => (
                <Link key={match.pathname} to={match.pathname}>
                    <span className="capitalize">{breadcrumb}</span>
                    <IoIosArrowForward />
                </Link>
            ))}
        </div>
    );
};

export default Breadcrumb;
