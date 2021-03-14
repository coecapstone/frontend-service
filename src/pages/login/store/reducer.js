import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    login: false,
    user: {
        role: 'submitter',
        unit: '',
        subunit: ''
    },
    profileObj: {},
    approvalSubunitList: []
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_TO_LOGIN: 
            //return state.set('login', action.value);
            return state.merge({
                login: true,
                profileObj: action.profile,
            });
        case constants.CHANGE_APPROVAL_SUBUNIT_LIST: 
            console.log(action.approvalSubunitList)
            return state.set('approvalSubunitList', action.approvalSubunitList);
        case constants.CHANGE_TO_LOGOUT: 
            return state.merge({
                login: false,
                user: {
                    role: 'submitter',
                    unit: '',
                    subunit: ''
                },
                profileObj: {},
                approvalSubunitList: []
            })
        case constants.CHANGE_ROLE_TO_APPROVER: 
            return state.setIn(['user', 'role'], 'approver');
        case constants.CHANGE_ROLE_TO_SUBMITTER: 
            return state.setIn(['user', 'role'], 'submitter');
        case constants.CHANGE_APPROVAL_INFO:
            return state.merge({
                user: {
                    unit: action.unit,
                    subunit: action.subunit
                }
            })
        default:
            return state;
    }
}

export default reducer;