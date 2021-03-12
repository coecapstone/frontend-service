import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
    HeaderWrapper,
    GroupHeader,
    Logo,
    Nav,
    NavItem
} from './style';

class Header extends Component {
    
    render() {
        const { login } = this.props;
        return (
            <HeaderWrapper> 
                <Logo href='/' />
                <Nav>
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
                    <GroupHeader className='setting'>SETTINGS</GroupHeader>
                    { 
                        login ? (<NavItem> <i className="iconfont">&#xe7cd;</i> Log Out</NavItem>) : 
                        (
                            <Link to='/login'>
                                <NavItem> <i className="iconfont">&#xe7cd;</i> Log In</NavItem>
                            </Link>
                        )
                    }
                </Nav>
            </HeaderWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // resetContentState() {
        //     dispatch(actionCreators.resetContentState());
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);