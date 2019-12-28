import React from 'react';
import { NavLink } from 'react-router-dom';
import { Divider } from 'antd';

import './Header.css';

const Header = () => {
    return (
        <div className="okn-nav">
            <NavLink to="/" exact className="okn-nav__link" activeClassName="okn-nav__link--active">Карта</NavLink>
            <Divider type="vertical" />
            <NavLink to="/objects" exact className="okn-nav__link" activeClassName="okn-nav__link--active">Список</NavLink>
        </div>
    );
};

export default Header;