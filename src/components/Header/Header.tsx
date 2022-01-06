import React from 'react';
import './Header.scss';
import { Outlet } from 'react-router-dom';

const Header = () => {
    return(
        <div>
            <div className="header">
                LIBRARY MANAGEMENT SYSTEM
            </div>
            <Outlet/>
        </div>
    )
}

export default Header;