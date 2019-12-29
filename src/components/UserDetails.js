import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Button, Popover } from 'antd';

import { fetchUserProfile, logout } from '../actions';
import { authService } from '../services/auth.service';
import './UserDetails.css';

class UserDetails extends React.Component {
    state = { visible: false };

    componentDidMount() {
        this.fetchUserProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.fetchUserProfile();
    }

    onLoginClick = () => {
        if (!this.props.isLoggedIn) {
            authService.login();
        }
    };

    onLogoutClick = () => {
        this.props.logout();
    };

    fetchUserProfile() {
        if (this.props.isLoggedIn && !this.props.profile) {
            this.props.fetchUserProfile();
        }
    }

    render() {
        if (this.props.isLoggedIn && this.props.profile) {
            return (
                <Popover
                    className="okn-user-details"
                    content={this.renderPopoverContent()}
                    trigger="click"
                    placement="bottomRight"
                    visible={this.state.visible}
                    onVisibleChange={visible => this.setState({ visible })}
                >
                    {this.renderAvatar()}
                    <span className="okn-username">{this.props.profile.name || 'Username'}</span>
                </Popover>
            );
        }

        return (
            <div className="okn-user-details">
                <Button type="link" icon="login" onClick={this.onLoginClick}>Войти</Button>
            </div>
        );
    };

    renderAvatar() {
        return this.props.profile.avatar
            ? <Avatar size="small" src={this.props.profile.avatar}/>
            : <Avatar size="small" icon="user"/>;
    }

    renderPopoverContent() {
        return (
            <div className="okn-user-details-popover">
                <Button
                    type="link"
                    icon="user"
                    href={this.props.profile.profileUrl}
                    target="_blank"
                >
                    Профиль на oldsaratov.ru
                </Button>
                <Button type="link" icon="logout" onClick={this.onLogoutClick}>Выйти</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: authService.isLoggedIn(),
        profile: state.user.profile
    };
};

export default connect(mapStateToProps, { fetchUserProfile, logout })(UserDetails);
