import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Header, Button } from 'semantic-ui-react';
import Immutable from 'immutable';
import { actionCreators as loginActionCreators } from '../../pages/login/store';

import {
    ApprovalWrapper,
    DivideBox,
    ChooseTitle,
    ChoooseDropdown
} from './style';

class Approval extends Component {
    render() {
        if (this.props.login) {
            return (
                <ApprovalWrapper>
                    <DivideBox>
                        <ChooseTitle> Here to Approve Requests? 
                            <Header className='text' as='h4'>If yes, please select your subunit info</Header>
                            <ChoooseDropdown>
                                <Dropdown placeholder='choose Unit Subunit' options={Immutable.List(this.props.list).toJS()} selection
                                    onChange={(e, data) => this.props.readSubunit(data.value)} />
                            </ChoooseDropdown>
                            <Header className='text' as='h4'>If no, click <Link to={'/'}>here</Link> to submit requests</Header>
                        </ChooseTitle>
                    </DivideBox>
                </ApprovalWrapper>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['login', 'approvalSubunitList']),
        login: state.getIn(['login', 'login']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        readSubunit(unitSubunitInfo) {
            console.log(unitSubunitInfo);
            dispatch(loginActionCreators.changeApprovalInfo(unitSubunitInfo));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Approval);