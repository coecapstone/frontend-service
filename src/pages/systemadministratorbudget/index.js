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
        const { getAllBudgetsList, getAllUnitsList } = this.props;
        getAllBudgetsList();
        getAllUnitsList();
    }

    render() {
        const { login, allBudgetsList, allBudgetsDropdownList, readInputBudget, budgetNumberChosen, budgetNameChosen, readBudgetNumber, 
            readBudgetName, appendBudget, removeBudget, readInputUnit } = this.props;
        const allBudgetsListJS = Immutable.List(allBudgetsList).toJS();
        const allBudgetsDropdownListJS = Immutable.List(allBudgetsDropdownList).toJS();
        const allUnitListJS = Immutable.List(this.props.allUnitList).toJS();
        const allSubunitListJS = Immutable.List(this.props.allSubunitList).toJS();
        const appendBudgetData = { 'budget_number': budgetNumberChosen, 'budget_name': budgetNameChosen };
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
                                    <Table.Row key={budget_number} onClick={() => readInputBudget(budget_number, budget_name )} >
                                        <Table.Cell>{budget_number}</Table.Cell>
                                        <Table.Cell>{budget_name}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Budget Number' placeholder='Budget Number' value={budgetNumberChosen} onChange={(e, data) => readBudgetNumber(data.value)}/>
                                <Form.Input fluid label='Budget Name' placeholder='Budget Name' value={budgetNameChosen} onChange={(e, data) => readBudgetName(data.value)}/>
                            </Form.Group>
                        </Form>
                        <Button color='violet' className='systemAdminBtn' content='Add' onClick={() => appendBudget(appendBudgetData)}></Button> 
                        <Button className='removeBtn systemAdminBtn' color='red' content='Remove' onClick={() => removeBudget(appendBudgetData)}></Button>
                    </UpperHalfWrapper>
                    <BottomHalfWrapper>
                        <Header as='h3'>Add Budgets Into Subunit</Header>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field required> <label>Choose Your Unit</label>
                                    <Dropdown options={allUnitListJS} selection clearable onChange={(e, data) => readInputUnit(data.value)} />
                                </Form.Field>
                                <Form.Field required> <label>Choose Your Subunit</label>
                                    <Dropdown  options={allSubunitListJS} selection clearable />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                        <Dropdown placeholder='All Budgets' fluid multiple search selection options={allBudgetsDropdownListJS} />
                    </BottomHalfWrapper>
                    <BottomHalfWrapper>
                        <Header as='h3'>Remove Budgets From Subunit</Header>
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
        budgetNumberChosen: state.getIn(['systemadministratorbudget', 'budget_number_chosen']),
        budgetNameChosen: state.getIn(['systemadministratorbudget', 'budget_name_chosen']),
        allUnitList: state.getIn(['systemadministratorbudget', 'unit']),
        allSubunitList: state.getIn(['systemadministratorbudget', 'subunit']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUnitsList() {
            dispatch(actionCreators.getAllUnitsList());
        },
        readInputUnit(unit) {
            dispatch(actionCreators.readInputUnit(unit));
        },
        getAllBudgetsList() {
            dispatch(actionCreators.getAllBudgetsList());
        },
        readInputBudget(budget_number, budget_name) {
            dispatch(actionCreators.readInputBudget(budget_number, budget_name));
        },
        readBudgetNumber(budget_number) {
            dispatch(actionCreators.readBudgetNumber(budget_number));
        },
        readBudgetName(budget_name) {
            dispatch(actionCreators.readBudgetName(budget_name));
        },
        appendBudget(appendBudgetData) {
            dispatch(actionCreators.appendBudget(appendBudgetData));
        },
        removeBudget(removeBudgetData) {
            dispatch(actionCreators.removeBudget(removeBudgetData));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdministratorBudget);