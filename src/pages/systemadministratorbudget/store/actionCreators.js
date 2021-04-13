import axios from 'axios';
import { fromJS } from 'immutable';

export const GET_ALL_UNITS = 'content/GET_ALL_UNITS';
export const GET_SUBUNITS = 'content/GET_SUBUNITS';
export const GET_ALL_BUDGETS_LIST = 'content/GET_ALL_BUDGETS_LIST';
export const GET_ALL_BUDGETS_DROPDOWN_LIST = 'content/GET_ALL_BUDGETS_DROPDOWN_LIST';
export const INPUT_BUDGET = 'content/INPUT_BUDGET';
export const READ_BUDGET_NUMBER = 'content/READ_BUDGET_NUMBER';
export const READ_BUDGET_NAME = 'content/READ_BUDGET_NAME';
export const CHANGE_TO_LOGOUT = 'content/CHANGE_TO_LOGOUT';
export const CLEAR_INPUT = 'content/CLEAR_INPUT';
export const INSERT_BUDGET_LIST = 'content/INSERT_BUDGET_LIST';
export const INSERT_BUDGET_LIST_JS = 'content/INSERT_BUDGET_LIST_JS';
export const REMOVE_BUDGET_LIST = 'content/REMOVE_BUDGET_LIST';
export const REMOVE_BUDGET_LIST_JS = 'content/REMOVE_BUDGET_LIST_JS';

export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
const clearInput = () => ({
    type: CLEAR_INPUT,
});
const insertBudgetList = (data) => ({
    type: INSERT_BUDGET_LIST,
    data: fromJS({'budget_number': data.budget_number, 'budget_name': data.budget_name })
});
const insertBudgetListJS = (data) => ({
    type: INSERT_BUDGET_LIST_JS,
    data: fromJS({'key': `${data.budget_number}, ${data.budget_name}`, 'text': `${data.budget_number}, ${data.budget_name}`, 'value': `${data.budget_number}, ${data.budget_name}` })
});
const removeBudgetList = (data) => ({
    type: REMOVE_BUDGET_LIST,
    budget_number: data.budget_number
});
const removeBudgetListJS = (data) => ({
    type: REMOVE_BUDGET_LIST_JS,
    budget: `${data.budget_number}, ${data.budget_name}`
});
const getAllBudgetsListAction = (data) => ({
    type: GET_ALL_BUDGETS_LIST,
    data: fromJS(data)
});
const getAllBudgetsDropdownListAction = (data) => ({
    type: GET_ALL_BUDGETS_DROPDOWN_LIST,
    data: fromJS(data)
});
const getAllUnitsAction = (data) => ({
    type: GET_ALL_UNITS,
    data: fromJS(data)
});
const getSubunits = (data) => ({
    type: GET_SUBUNITS,
    data: fromJS(data)
});
export const readInputBudget = (budget_number, budget_name) => ({
    type: INPUT_BUDGET,
    budget_number, 
    budget_name
});
export const readBudgetNumber = (data) => ({
    type: READ_BUDGET_NUMBER,
    data
});
export const readBudgetName = (data) => ({
    type: READ_BUDGET_NAME,
    data
});
export const getAllBudgetsList = () => {
    return (dispatch) => {
        axios.get('http://localhost:8080/api/getAllBudgetsList')
            .then(res => {
                dispatch(getAllBudgetsListAction(res.data))
                let allBudgetsDropdownList = [];
                res.data.map(item => {
                    const one_budget = {};
                    const row = `${item.budget_number}, ${item.budget_name}`
                    one_budget.key = row;
                    one_budget.text = row;
                    one_budget.value = row;
                    allBudgetsDropdownList.push(one_budget);
                });
                dispatch(getAllBudgetsDropdownListAction(allBudgetsDropdownList))
            })
            .catch((error) => {
                console.log(error)
            })
    }
};
export const appendBudget = (appendBudgetData) => {
    return (dispatch) => {
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(appendBudgetData)
        }
        console.log('appendBudget', options)
        fetch(`http://localhost:8080/api/appendBudget`, options)
            .then(res => {
                console.log(res)
                dispatch(insertBudgetList(appendBudgetData))
                dispatch(insertBudgetListJS(appendBudgetData))
                dispatch(clearInput())
            })
            .catch(error => {
                console.log(error)
            })
    }
};
export const removeBudget = (removeBudgetData) => {
    return (dispatch) => {
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(removeBudgetData)
        }
        console.log('removeBudget', options)
        fetch(`http://localhost:8080/api/removeBudget`, options)
            .then(res => {
                console.log(res)
                dispatch(removeBudgetList(removeBudgetData))
                dispatch(removeBudgetListJS(removeBudgetData))
                dispatch(clearInput())
            })
            .catch(error => {
                console.log(error)
            })
    }
};
export const getAllUnitsList = () => {
    return (dispatch) => {
        axios.get('http://localhost:8080/api/getAllUnits')
            .then(res => {
                let allUnitsList = [];
                res.data.map(item => {
                    const unit = {};
                    unit.key = item;
                    unit.text = item;
                    unit.value = item;
                    allUnitsList.push(unit);
                });
                dispatch(getAllUnitsAction(allUnitsList));
            })
            .catch((error) => {
                console.log(error)
            })
    }
};
export const readInputUnit = (unit) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/getSubunits/${unit}`)
            .then(res => {
                // console.log(res)
                let allSubunitsList = [];
                res.data.map(item => {
                    const subunit = {};
                    subunit.key = item;
                    subunit.text = item;
                    subunit.value = item;
                    allSubunitsList.push(subunit);
                });
                dispatch(getSubunits(allSubunitsList));
            })
            .catch((error) => {
                console.log(error)
            })
    }
};