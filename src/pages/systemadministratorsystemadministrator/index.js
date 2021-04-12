import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Input, Card, Header, Button, Confirm, Message, Form } from 'semantic-ui-react';

import {
    ContentWrapper,
} from './style';

class SystemAdministratorSystemAdministrator extends Component {

    componentDidMount() {
        const { getAllSystemAdministratorList } = this.props;
        getAllSystemAdministratorList();
    }

    render() {
        const { readInputSystemAdmin, systemAdministratorNetID, appendSystemAdministrator, removeSystemAdministrator, } = this.props;
        const allSystemAdministratorListJS = Immutable.List(this.props.allSystemAdministratorList).toJS();
        if (this.props.login) {
            return (
                <ContentWrapper>
                    <Header as='h2'>System Administrator Overview</Header>
                    <Table celled selectable className='systemAdminTable'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>NetID</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {allSystemAdministratorListJS.map(({ text }) => (
                                <Table.Row key={text} onClick={() => readInputSystemAdmin(text)} >
                                    <Table.Cell>{text}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <Header as='h4'>System Administrator NetID</Header>
                    <Input className='systemAdminInput' placeholder='UW NetID' value={systemAdministratorNetID} onChange={(e, data) => readInputSystemAdmin(data.value)}/>
                    <div className='systemAdminTable'>
                        <Button className='systemAdminBtn' color='violet' content='Add' onClick={() => appendSystemAdministrator(systemAdministratorNetID)}></Button>
                        <Button className='removeBtn systemAdminBtn' color='red' content='Remove' onClick={() => removeSystemAdministrator(systemAdministratorNetID)}></Button> 
                    </div>
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
        allSystemAdministratorList: state.getIn(['systemadministratorsystemadministrator', 'systemadministrator']),
        systemAdministratorNetID: state.getIn(['systemadministratorsystemadministrator', 'systemAdministratorNetIDChosen']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSystemAdministratorList() {
            dispatch(actionCreators.getAllSystemAdministratorList());
        },
        readInputSystemAdmin(unit) {
            dispatch(actionCreators.inputSystemAdminName(unit));
        },
        // inputUnitName(data) {
        //     dispatch(actionCreators.inputUnitName(data));
        // },
        appendSystemAdministrator(systemAdministratorNetID) {
            dispatch(actionCreators.appendSystemAdministrator(systemAdministratorNetID))
        },
        removeSystemAdministrator(systemAdministratorNetID) {
            dispatch(actionCreators.removeSystemAdministrator(systemAdministratorNetID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdministratorSystemAdministrator);