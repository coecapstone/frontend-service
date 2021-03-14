import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Header, Button } from 'semantic-ui-react';
import Immutable from 'immutable';
import { actionCreators as loginActionCreators } from '../../pages/login/store';

import {
    ApprovalWrapper,
    DivideBox,
    ChooseTitle,
    ChoooseDropdown,
    ApprovalWelcomeWrapper,
    Nav,
    GroupHeader,
    NavItem,
    DirectText,
} from './style';

class Approval extends Component {
    chooseUnitSubunit() {
        const { login, subunit, list, readSubunit, changeRoleToSubmitter } = this.props;
        if (login && subunit === '') {
            return (
                <ApprovalWrapper>
                    <DivideBox>
                        <ChooseTitle> Here to Approve Requests? 
                            <Header className='text' as='h4'>If <span className="importantText">Yes</span>, please select your subunit info</Header>
                            <ChoooseDropdown>
                                <Dropdown placeholder='choose Unit Subunit' options={Immutable.List(list).toJS()} selection
                                    onChange={(e, data) => readSubunit(data.value)} />
                            </ChoooseDropdown>
                            <Header className='text' as='h4'>If <span className="importantText">No</span>, click <Link to={'/'}><DirectText onClick={() => changeRoleToSubmitter()}>here</DirectText></Link> to submit requests</Header>
                        </ChooseTitle>
                    </DivideBox>
                </ApprovalWrapper>
            );
        } else {
            return null;
        }
    }

    displayApprovalWelcome() {
        if (this.props.subunit !== '') {
            return (
                <Nav>
                    <GroupHeader>GENERAL USER</GroupHeader>
                    <Link to={'/requests-to-approve'}>
                        <NavItem>
                            <i className="iconfont">&#xe638;</i>To Be Approved
                        </NavItem>
                    </Link>
                </Nav>
            );
        }
    }

    render() {
        return (
            <Fragment>
                {this.chooseUnitSubunit()}
                {this.displayApprovalWelcome()}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['login', 'approvalSubunitList']),
        login: state.getIn(['login', 'login']),
        unit: state.getIn(['login', 'user', 'unit']),
        subunit: state.getIn(['login', 'user', 'subunit']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        readSubunit(unitSubunitInfo) {
            console.log(unitSubunitInfo);
            dispatch(loginActionCreators.changeApprovalInfo(unitSubunitInfo));
        },
        changeRoleToSubmitter() {
            dispatch(loginActionCreators.changeRoleToSubmitter());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Approval);