import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Card, Header, Button, Message, Form } from 'semantic-ui-react';

import {
    ContentWrapper,
    // TableWrapper,
    // DirectText,
    // Nav,
    // GroupHeader,
} from './style';

class SystemAdministratorUnitAndSubunit extends Component {
    render() {
        if (this.props.login) {
            return (
                <ContentWrapper>
                    <Header as='h2'>Unit Overview</Header>
                    {/* {this.displayChooseForm()}
                    {this.displayMessage()}
                    {this.displayForm()} */}
                </ContentWrapper>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login']),
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdministratorUnitAndSubunit);