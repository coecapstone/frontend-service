import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Header, Button } from 'semantic-ui-react';
import Immutable from 'immutable';
import { actionCreators as loginActionCreators } from '../../common/login/store';

import {
    ApprovalWrapper,
    DivideBox,
    ChooseTitle,
    SelectBlock,
    DirectText,
} from './style';

class Approver extends Component {

    render() {
        const { login, list, readSubunit, changeRole, chooseRole, changeChooseRole } = this.props;
        if (login) {
            if (!chooseRole) {
                return (
                    <ApprovalWrapper>
                        <DivideBox>
                            <ChooseTitle> 
                                <SelectBlock>
                                    Continue as <span className="importantText">Approver</span>
                                    <Header className='textButtom' as='h5'>
                                       <Dropdown placeholder='choose Unit Subunit' options={Immutable.List(list).toJS()} selection onChange={(e, data) => readSubunit(data.value)} />
                                    </Header>
                                </SelectBlock>
                                <SelectBlock>
                                    Continue as <span className="importantText">Submitter</span>
                                    <Header className='textButtom' as='h4'>click <Link to={'/submitter-mainpage'}><DirectText onClick={() => changeRole('submitter')}>here</DirectText></Link> to submit requests</Header>
                                </SelectBlock>
                            </ChooseTitle>
                        </DivideBox>
                    </ApprovalWrapper>
                );
            } else {
                return <Redirect to='/approver-mainpage' />
            }
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
            console.log('unitSubunitInfo', unitSubunitInfo);
            dispatch(loginActionCreators.changeApprovalInfo(unitSubunitInfo));
            dispatch(loginActionCreators.changeChooseRole(true));
        },
        changeRole(role) {
            dispatch(loginActionCreators.changeRole(role));
            dispatch(loginActionCreators.changeChooseRole(true));
        },
        changeChooseRole(hasChoseRole) {
            dispatch(loginActionCreators.changeChooseRole(hasChoseRole));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Approver);