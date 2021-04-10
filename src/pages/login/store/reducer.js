import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    login: false,
    user: {
        role: '',
        unit: '',
        subunit: ''
    },
    profileObj: {},
    fiscalStaffSubunitList: [],
    approverSubunitList: []
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_TO_LOGIN: 
            return state.merge({
                login: true,
                profileObj: action.profile,
            });
        case constants.CHANGE_APPROVER_SUBUNIT_LIST: 
            return state.set('approverSubunitList', action.approverSubunitList);
        case constants.CHANGE_FISCAL_STAFF_SUBUNIT_LIST: 
            return state.set('fiscalStaffSubunitList', action.fiscalStaffSubunitList);
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge({
                login: false,
                user: {
                    role: '',
                    unit: '',
                    subunit: ''
                },
                profileObj: {},
                fiscalStaffSubunitList: [],
                approverSubunitList: []
            })
        case constants.CHANGE_ROLE: 
            return state.setIn(['user', 'role'], action.role);
        case constants.CHANGE_APPROVAL_INFO:
            return state.merge({
                user: {
                    role: 'approver',
                    unit: action.unit,
                    subunit: action.subunit
                }
            })
        default:
            return state;
    }
}

export default reducer;