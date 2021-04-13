import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import { actionCreators as contentActionCreators } from '../../pages/content/store';
import { actionCreators as requestsActionCreators } from '../../pages/requests/store';
import { actionCreators as approvalRequestsActionCreators } from '../../pages/approvalrequest/store';
import { actionCreators as SystemAdministratorUnitAndSubunitActionCreators } from '../../pages/systemadministratorunitandsubunit/store';
import { actionCreators as SystemAdministratorSystemAdministratorActionCreators } from '../../pages/systemadministratorsystemadministrator/store';
import { actionCreators as SystemAdministratorBudgetActionCreators } from '../../pages/systemadministratorbudget/store';

import {
    HeaderWrapper,
    GroupHeader,
    Logo,
    Nav,
    NavItem,
} from './style';

class Header extends Component {

    getSubmitterNavItems() {
        const { login, chooseRole, role, changeChooseRole } = this.props;
        if (login && chooseRole) {
            if (role === 'submitter') {
                return (<div>sdf</div>)
            }
            else if (role === 'fiscal staff') {
                return (<div>hifhidfd</div>)
            }
            else if (role === 'approver') {
                return (<div>approe</div>)
            }
            else if (role === 'system administrator') {
                return (
                    <Fragment>
                        <GroupHeader>MANAGE UNIT</GroupHeader>
                        <Link to={'/system-administrator-unit-and-subunit'}>
                            <NavItem>
                                <i className="iconfont iconfontSystemAdministrator">&#xe6df;</i>Unit and Subunit
                            </NavItem>
                        </Link>
                        <Link to={'/system-administrator-budget'}>
                            <NavItem>
                                <i className="iconfont iconfontSystemAdministrator">&#xe601;</i>Budget
                            </NavItem>
                        </Link>
                        <GroupHeader>MANAGE PEOPLE</GroupHeader>
                        <Link to={'/system-administrator-manage-system-administrator'}>
                            <NavItem>
                                <i className="iconfont iconfontSystemAdministrator">&#xe664;</i>Administrator
                            </NavItem>
                        </Link>
                        <Link to={'/system-administrator-manage-fiscal-staff'}>
                            <NavItem>
                                <i className="iconfont iconfontSystemAdministrator">&#xe664;</i>Fiscal Staff
                            </NavItem>
                        </Link>
                        <Link to={'/system-administrator-manage-approver'}>
                            <NavItem>
                                <i className="iconfont iconfontSystemAdministrator">&#xe664;</i>Approver
                            </NavItem>
                        </Link>
                        <GroupHeader>CHOOSE ROLE</GroupHeader>
                        <Link to={'/choose-role-system-administrator'}>
                            <NavItem onClick={() => changeChooseRole(false)}>
                                <i className="iconfont iconfontSystemAdministrator">&#xe664;</i>Choose Role
                            </NavItem>
                        </Link>
                    </Fragment>
                )
            }
        }
    }
    
    render() {
        const { login, logout } = this.props;
        return (
            <HeaderWrapper> 
                <Logo href='/' />
                <Nav>
                    <GroupHeader>SETTINGS</GroupHeader> 
                    { 
                        login ? 
                        <Link to='/'> 
                            <NavItem onClick={() => logout()}> <i className="iconfont">&#xe723;</i> Log Out</NavItem> 
                        </Link> : 
                        <Link to='/login'> 
                            <NavItem> <i className="iconfont">&#xe723;</i> Log In</NavItem> 
                        </Link>
                    }
                    { this.getSubmitterNavItems() }
                </Nav>
            </HeaderWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login']),
        chooseRole: state.getIn(['login', 'chooseRole']),
        role: state.getIn(['login', 'user', 'role']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout() {
            dispatch(loginActionCreators.logout());
            dispatch(contentActionCreators.logout());
            dispatch(requestsActionCreators.logout());
            dispatch(approvalRequestsActionCreators.logout());
            dispatch(SystemAdministratorUnitAndSubunitActionCreators.logout())
            dispatch(SystemAdministratorSystemAdministratorActionCreators.logout())
            dispatch(SystemAdministratorBudgetActionCreators.logout())
        }, 
        changeChooseRole(hasChoseRole) {
            dispatch(loginActionCreators.changeChooseRole(hasChoseRole));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);