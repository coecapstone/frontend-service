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
    SelectBlock,
    SelectBlockSystemAdministrator,
    DirectText,
} from './style';

class SystemAdministrator extends Component {

    render() {
        const { login, list, readSubunit, changeRole, chooseRole, changeChooseRole } = this.props;
        if (login && !chooseRole) {
            return (
                <ApprovalWrapper>
                    <DivideBox>
                        <ChooseTitle> 
                            <SelectBlockSystemAdministrator>
                                Continue as <span className="importantText">System Administrator</span>
                                <Header className='textButtom' as='h4'>click <Link to={'/system-administrator-mainpage'}><DirectText onClick={() => changeChooseRole(true)}>here</DirectText></Link> to manage system</Header>
                            </SelectBlockSystemAdministrator>
                            <SelectBlock>
                                Continue as <span className="importantText">Fiscal Staff</span>
                                <Header className='textButtom' as='h5'>
                                    <Dropdown placeholder='choose Unit Subunit' options={Immutable.List(list).toJS()} selection onChange={(e, data) => readSubunit(data.value)} />
                                </Header>
                            </SelectBlock>
                            <SelectBlock>
                                Continue as <span className="importantText">Approver</span>
                                <Header className='textButtom' as='h5'>
                                    <Dropdown placeholder='choose Unit Subunit' options={Immutable.List(list).toJS()} selection onChange={(e, data) => readSubunit(data.value)} />
                                </Header>
                            </SelectBlock>
                            <SelectBlock>
                                Continue as <span className="importantText">Submitter</span>
                                <Header className='textButtom' as='h4'>click <Link to={'/'}><DirectText onClick={() => changeRole('submitter')}>here</DirectText></Link> to submit requests</Header>
                            </SelectBlock>
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
        list: state.getIn(['login', 'approverSubunitList']),
        login: state.getIn(['login', 'login']),
        chooseRole: state.getIn(['login', 'chooseRole']),
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
        changeRole(role) {
            dispatch(loginActionCreators.changeRole(role));
        },
        changeChooseRole(hasChoseRole) {
            dispatch(loginActionCreators.changeChooseRole(hasChoseRole));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdministrator);