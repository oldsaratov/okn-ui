import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Button, Popover } from 'antd';

import { logout } from '../actions';
import { authService } from '../services/auth.service';
import './UserDetails.css';

class UserDetails extends React.Component {
    state = { visible: false };

    onLoginClick = () => {
        if (!this.props.isLoggedIn) {
            authService.login();
        }
    };

    onLogoutClick = () => {
        this.props.logout();
    };

    render() {
        if (this.props.isLoggedIn) {
            return (
                <Popover
                    className="okn-user-details"
                    content={this.renderPopoverContent()}
                    trigger="click"
                    placement="bottomRight"
                    visible={this.state.visible}
                    onVisibleChange={visible => this.setState({ visible })}
                >
                    <Avatar icon="user" size="small"/>
                    <span className="okn-username">Username</span>
                </Popover>
            );
        }

        return (
            <div className="okn-user-details">
                <Button type="link" icon="login" onClick={this.onLoginClick}>Войти</Button>
            </div>
        );
    };

    renderPopoverContent() {
        // TODO: Use link from user profile for redirect
        return (
            <div className="okn-user-details-popover">
                <Button type="link" icon="user" href="http://oldsaratov.ru/" target="_blank">Профиль на oldsaratov.ru</Button>
                <Button type="link" icon="logout" onClick={this.onLogoutClick}>Выйти</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { isLoggedIn: authService.isLoggedIn() };
};

export default connect(mapStateToProps, { logout })(UserDetails);
