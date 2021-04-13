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
        const { login, allBudgetsList, allBudgetsDropdownList, readInputBudget, budgetNumberChosen, budgetNameChosen, readBudgetNumber, readBudgetName } = this.props;
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
                                    <Table.Row key={budget_number} onClick={() => readInputBudget(budget_number, budget_name )} >
                                        <Table.Cell>{budget_number}</Table.Cell>
                                        <Table.Cell>{budget_name}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        {/* <Input className='unitName' placeholder='Unit Name' value={unitName} onChange={(e, data) => inputUnitName(data.value)}/> */}
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Budget Number' placeholder='Budget Number' value={budgetNumberChosen} onChange={(e, data) => readBudgetNumber(data.value)}/>
                                <Form.Input fluid label='Budget Name' placeholder='Budget Name' value={budgetNameChosen} onChange={(e, data) => readBudgetName(data.value)}/>
                            </Form.Group>
                        </Form>
                        <Button color='violet' className='systemAdminBtn' content='Add'></Button> 
                        {/* onClick={() => appendBudget(unitName)} */}
                        <Button className='removeBtn systemAdminBtn' color='red' content='Remove' ></Button>
                        {/* onClick={() => removeBudget(unitName)} */}
                    </UpperHalfWrapper>
                    {/* <BottomHalfWrapper>
                        <Header as='h3'>Add Budgets Into Subunit</Header>
                        <Dropdown placeholder='All Budgets' fluid multiple search selection options={allBudgetsDropdownListJS} />
                    </BottomHalfWrapper> */}
                </ContentWrapper>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login']),
        allBudgetsList: state.getIn(['systemadministratorbudget', 'all_budgets_list']),
        budgetNumberChosen: state.getIn(['systemadministratorbudget', 'budget_number_chosen']),
        budgetNameChosen: state.getIn(['systemadministratorbudget', 'budget_name_chosen']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdministratorBudget);