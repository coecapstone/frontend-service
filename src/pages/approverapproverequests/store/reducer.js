import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    requests: [],
    detailRequest: [],
    detailId: '',
    showApprovedMessage: false,
    showDeclinedToast: false,
    showDeclineMessageInputBox: false,
    reason: '',
    budget_list: [],
    whether_pay_flight: [],
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.GET_SUBUNIT_REQUESTS:
            return state.set('requests', action.data);
        case constants.BACK_TO_REQUESTS:
        case constants.CHANGE_TO_LOGOUT:
            return state.merge({
                detailRequest: [],
                detailId: '',
                showApprovedMessage: false,
                showDeclinedToast: false,
                showDeclineMessageInputBox: false,
                reason: '',
                budget_list: [],
                whether_pay_flight: [],
            });
        case constants.SET_REQUEST_DETAIL:
            return state.merge({
                detailRequest: action.data,
                detailId: action.id
            });
        case constants.SET_WHETHER_PAY_FLIGHT: 
            return state.set('whether_pay_flight', action.data);
        case constants.SET_BUDGET_DETAIL: 
            return state.set('budget_list', action.data);
        case constants.SHOW_APPROVED_MESSAGE:
            return state.merge({
                showApprovedMessage: true,
                showDeclinedToast: false,
                showDeclineMessageInputBox: false,
            });
        case constants.SHOW_DECLINE_MESSAGE_INPUTBOX:
            return state.merge({
                showApprovedMessage: false,
                showDeclinedToast: false,
                showDeclineMessageInputBox: true,
            });
        case constants.SHOW_DECLINED_TOAST:
            return state.merge({
                showApprovedMessage: false,
                showDeclinedToast: true,
                showDeclineMessageInputBox: false,
            });
        case constants.UPDATE_REASON:
            return state.set('reason', action.value);
        default:
            return state;
    }
}

export default reducer;