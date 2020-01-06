import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Divider, Row } from 'antd';

import UserDetails from './UserDetails';
import './Header.scss';
import logo from '../assets/logo_small.png';

const Header = () => {
    return (
        <Row className="okn-nav">
            <Col span={12}>
                <img src={logo} alt="Logo" className="okn-nav__logo" />
                <NavLink to="/" exact className="okn-nav__link" activeClassName="okn-nav__link--active">Карта</NavLink>
                <Divider type="vertical" />
                <NavLink to="/objects" exact className="okn-nav__link" activeClassName="okn-nav__link--active">Список</NavLink>
            </Col>

            <Col span={12}>
                <UserDetails />
            </Col>
        </Row>
    );
};

export default Header;