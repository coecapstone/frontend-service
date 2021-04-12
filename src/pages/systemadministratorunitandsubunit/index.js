import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Input, Card, Header, Button, Confirm, Message, Form } from 'semantic-ui-react';

import {
    ContentWrapper,
    LeftHalfWrapper,
    RightHalfWrapper,
} from './style';

class SystemAdministratorUnitAndSubunit extends Component {

    componentDidMount() {
        const { getAllUnitsList } = this.props;
        getAllUnitsList();
    }

    render() {
        const { readInputUnit, inputUnitName, unitName, appendUnitName, removeUnitName } = this.props;
        const allUnitListJS = Immutable.List(this.props.allUnitList).toJS();
        const allSubunitListJS = Immutable.List(this.props.allSubunitList).toJS();
        if (this.props.login) {
            return (
                <ContentWrapper>
                    <LeftHalfWrapper>
                        <Header as='h2'>Units Overview</Header>
                        <Table celled selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {allUnitListJS.map(({ text }) => (
                                    <Table.Row key={text} onClick={() => readInputUnit(text)}>
                                        <Table.Cell>{text}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        <Header as='h4'>Unit Name</Header>
                        <Input className='unitName' placeholder='Unit Name' value={unitName} onChange={(e, data) => inputUnitName(data.value)}/>
                        <Button color='violet' content='Add' onClick={() => appendUnitName(unitName)}></Button>
                        <Button className='removeBtn' color='red' content='Remove' onClick={() => removeUnitName(unitName)}></Button>
                    </LeftHalfWrapper>
                    <RightHalfWrapper>
                        <Header as='h2'>Subunits for the Unit</Header>
                        <Table celled selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {allSubunitListJS.map(({ text }) => (
                                    <Table.Row key={text}>
                                        <Table.Cell>{text}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </RightHalfWrapper>
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
        allUnitList: state.getIn(['systemadministratorunitandsubunit', 'unit']),
        allSubunitList: state.getIn(['systemadministratorunitandsubunit', 'subunit']),
        unitName: state.getIn(['systemadministratorunitandsubunit', 'unitChosen']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUnitsList() {
            dispatch(actionCreators.getAllUnitsList());
        },
        readInputUnit(unit) {
            dispatch(actionCreators.readInputUnit(unit));
            dispatch(actionCreators.inputUnitName(unit));
        },
        inputUnitName(data) {
            dispatch(actionCreators.inputUnitName(data));
        },
        appendUnitName(unitName) {
            dispatch(actionCreators.appendUnitName(unitName))
        },
        removeUnitName(unitName) {
            dispatch(actionCreators.removeUnitName(unitName))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdministratorUnitAndSubunit);