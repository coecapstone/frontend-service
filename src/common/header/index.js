import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem
} from './style';

class Header extends Component {
    
    render() {
        return (
            <HeaderWrapper> 
                <Logo href='/' />
                <Nav>
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
                </Nav>
            </HeaderWrapper>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // resetContentState() {
        //     dispatch(actionCreators.resetContentState());
        // }
    }
}

export default connect(null, mapDispatchToProps)(Header);