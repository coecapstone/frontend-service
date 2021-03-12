import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { actionCreators } from './store';

import {
    LoginWrapper,
    LoginBox,
    LoginText
} from './style';

class Login extends Component {
    render() {
        const { login } = this.props;
        const clientId = '767966548929-ghusim71l8qt3jv5ub8bhomtfg8t7787.apps.googleusercontent.com';
        // https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
        return (
            login ? null : (
            <LoginWrapper>
                <LoginBox>
                    <LoginText>Please Login via UW Email</LoginText>
                    <GoogleLogin
                        className="googleLogin"
                        clientId={clientId}
                        buttonText="Sign in with UW Email"
                        onSuccess={(res) => this.props.onSuccess(res)}
                        onFailure={(error) => this.props.onFailure(error)}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                </LoginBox>
            </LoginWrapper> )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSuccess(res) {
            console.log(res.profileObj);
            const profile = res.profileObj;
            // 这个请求如果 login是true就不需要
            dispatch(actionCreators.login(profile));
        },
        onFailure(error) {
            console.log(error);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);