import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Card, Header, Button, Message, Form } from 'semantic-ui-react';

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
        const { readInputUnit } = this.props;
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUnitsList() {
            dispatch(actionCreators.getAllUnitsList());
        },
        readInputUnit(data) {
            dispatch(actionCreators.readInputUnit(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdministratorUnitAndSubunit);