import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    all_budgets_list: [],
    all_budgets_dropdown_list: [],
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.GET_ALL_BUDGETS_LIST:
            return state.set('all_budgets_list', action.data);
        case constants.GET_ALL_BUDGETS_DROPDOWN_LIST:
            return state.set('all_budgets_dropdown_list', action.data);
        case constants.CHANGE_TO_LOGOUT:
            return state.merge(fromJS({
                all_budgets_list: [],
                all_budgets_dropdown_list: [],
            }));
        default:
            return state;
    }
}

export default reducer;