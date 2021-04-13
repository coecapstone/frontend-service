import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    all_budgets_list: [],
    all_budgets_dropdown_list: [],
    budget_number_chosen: '', budget_name_chosen: '',
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.GET_ALL_BUDGETS_LIST:
            return state.set('all_budgets_list', action.data);
        case constants.GET_ALL_BUDGETS_DROPDOWN_LIST:
            return state.set('all_budgets_dropdown_list', action.data);
        case constants.READ_BUDGET_NUMBER:
            return state.set('budget_number_chosen', action.data);
        case constants.READ_BUDGET_NAME:
            return state.set('budget_name_chosen', action.data);
        case constants.INPUT_BUDGET:
            return state.merge({
                budget_number_chosen: action.budget_number,
                budget_name_chosen: action.budget_name,
            });
        case constants.CLEAR_INPUT:
            return state.merge({
                budget_number_chosen: '',
                budget_name_chosen: '',
            });
        case constants.INSERT_BUDGET_LIST:
            return state.update('all_budgets_list', arr => arr.push(action.data));
        case constants.INSERT_BUDGET_LIST_JS:
            return state.update('all_budgets_dropdown_list', arr => arr.push(action.data));
        case constants.CHANGE_TO_LOGOUT:
            return state.merge(fromJS({
                all_budgets_list: [],
                all_budgets_dropdown_list: [],
                budget_number_chosen: '', budget_name_chosen: '',
            }));
        default:
            return state;
    }
}

export default reducer;