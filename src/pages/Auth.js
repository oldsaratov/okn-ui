import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import history from '../history';
import { login } from '../actions';
import { authService } from '../services/auth.service';

class Auth extends React.Component {

    componentDidMount() {
        const session = authService.extractSession(window.location.href);

        if (session) {
            this.props.login(session); // Save session to store
            history.push(session.state); // Redirect user back to initial page
        }
    }

    render() {
        return (
            <div className="okn-empty-state">
                <Spin size="large"/>
            </div>
        );
    }
}

export default connect(null, { login })(Auth);
