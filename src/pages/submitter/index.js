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
    SelectBlockSystemAdministrator,
    DirectText,
} from './style';

class Submitter extends Component {

    componentDidMount() {
        this.props.changeChooseRole(true);
    }

    render() {
        const { login } = this.props;
        if (login) {
            return <Redirect to='/submitter-mainpage' />
        } else {
            return <Redirect to='/login' />
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
        changeChooseRole(hasChoseRole) {
            dispatch(loginActionCreators.changeChooseRole(hasChoseRole));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submitter);