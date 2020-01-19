import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'antd';

import UserDetails from './UserDetails';
import './Header.scss';
import logo from '../assets/logo_small.png';

const Header = () => {
    return (
        <Row className="okn-nav">
            <Col span={18}>
                <img src={logo} alt="Logo" className="okn-nav__logo" />
                <NavLink to="/" exact className="okn-nav__link">
                    Культурное наследие Саратовской области
                </NavLink>
            </Col>

            <Col span={6}>
                <UserDetails />
            </Col>
        </Row>
    );
};

export default Header;