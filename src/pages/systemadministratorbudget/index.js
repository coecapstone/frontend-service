import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Header, Dropdown, Card, Button, Message, Form } from 'semantic-ui-react';

import {
    ContentWrapper,
    UpperHalfWrapper,
    BottomHalfWrapper,
    // TableWrapper,
    // DirectText,
    // Nav,
    // GroupHeader,
} from './style';

class SystemAdministratorBudget extends Component {

    componentDidMount() {
        const { getAllBudgetsList } = this.props;
        getAllBudgetsList();
    }

    render() {
        const { login, allBudgetsList, allBudgetsDropdownList } = this.props;
        const allBudgetsListJS = Immutable.List(allBudgetsList).toJS();
        const allBudgetsDropdownListJS = Immutable.List(allBudgetsDropdownList).toJS();
        if (login) {
            return (
                <ContentWrapper>
                    <UpperHalfWrapper>
                        <Header as='h3'>Budgets Overview</Header>
                        <Table celled selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Budget Number</Table.HeaderCell>
                                    <Table.HeaderCell>Budget Name</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {allBudgetsListJS.map(({ budget_number, budget_name }) => (
                                    <Table.Row key={budget_number}>
                                        <Table.Cell>{budget_number}</Table.Cell>
                                        <Table.Cell>{budget_name}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </UpperHalfWrapper>
                    <BottomHalfWrapper>
                        <Header as='h3'>Add Budgets Into Subunit</Header>
                        <Dropdown placeholder='All Budgets' fluid multiple search selection options={allBudgetsDropdownListJS} />
                    </BottomHalfWrapper>
                </ContentWrapper>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login']),
        allBudgetsList: state.getIn(['systemadministratorbudget', 'all_budgets_list']),
        allBudgetsDropdownList: state.getIn(['systemadministratorbudget', 'all_budgets_dropdown_list']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllBudgetsList() {
            dispatch(actionCreators.getAllBudgetsList());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdministratorBudget);