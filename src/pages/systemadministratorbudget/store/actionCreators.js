import axios from 'axios';
import { fromJS } from 'immutable';

export const GET_ALL_BUDGETS_LIST = 'content/GET_ALL_BUDGETS_LIST';
export const GET_ALL_BUDGETS_DROPDOWN_LIST = 'content/GET_ALL_BUDGETS_DROPDOWN_LIST';
export const CHANGE_TO_LOGOUT = 'content/CHANGE_TO_LOGOUT';
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
const getAllBudgetsListAction = (data) => ({
    type: GET_ALL_BUDGETS_LIST,
    data: fromJS(data)
});
const getAllBudgetsDropdownListAction = (data) => ({
    type: GET_ALL_BUDGETS_DROPDOWN_LIST,
    data: fromJS(data)
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