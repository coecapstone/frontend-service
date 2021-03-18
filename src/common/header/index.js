import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import { actionCreators as contentActionCreators } from '../../pages/content/store';
//import { actionCreators as approvalActionCreators } from '../../pages/approval/store';
import { actionCreators as requestsActionCreators } from '../../pages/requests/store';
import { actionCreators as approvalRequestsActionCreators } from '../../pages/approvalrequest/store';

import {
    HeaderWrapper,
    GroupHeader,
    Logo,
    Nav,
    NavItem,
} from './style';

class Header extends Component {

    getSubmitterNavItems() {
        const { login, role } = this.props;
        if (login && role === 'submitter') {
            return (
                <Fragment>
                    <GroupHeader>GENERAL USER</GroupHeader>
                    <Link to={'/create-request'}>
                        <NavItem>
                            <i className="iconfont">&#xe616;</i>Create Request
                        </NavItem>
                    </Link>
                    <Link to={'/my-requests'}>
                        <NavItem>
                            <i className="iconfont">&#xe602;</i>My Requests
                        </NavItem>
                    </Link>
                </Fragment>
            )
        }
    }
    
    render() {
        const { login } = this.props;
        return (
            <HeaderWrapper> 
                <Logo href='/' />
                <Nav>
                    <GroupHeader>SETTINGS</GroupHeader> { 
                        login ? (
                            <Link to='/'>
                                <NavItem onClick={() => this.props.logout()}> <i className="iconfont">&#xe723;</i> Log Out</NavItem> 
                            </Link>
                        ) : (
                            <Link to='/login'>
                                <NavItem> <i className="iconfont">&#xe723;</i> Log In</NavItem>
                            </Link>
                        )
                    }
                    { this.getSubmitterNavItems()}
                </Nav>
            </HeaderWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login']),
        role: state.getIn(['login', 'user', 'role']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout() {
            dispatch(loginActionCreators.logout());
            dispatch(contentActionCreators.logout());
            dispatch(requestsActionCreators.logout());
            //dispatch(actionCreators.resetContentState());
            dispatch(approvalRequestsActionCreators.logout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);