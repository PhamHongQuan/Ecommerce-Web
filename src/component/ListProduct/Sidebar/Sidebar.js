import {Link, useRouteError} from "react-router-dom";
import React from "react";

export default function Sidebar() {
    return (
        <div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '10px 0' }}><Link to="/list-product/nike">Nike </Link></li>
                <li style={{ margin: '10px 0' }}><Link to="/list-product/nike">Nike </Link></li>
                <li style={{ margin: '10px 0' }}><Link to="/list-product/nike">Nike </Link></li>
                <li style={{ margin: '10px 0' }}><Link to="/list-product/nike">Nike </Link></li>
            </ul>
        </div>
    );
}
