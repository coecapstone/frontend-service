import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    login: false,
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
                profileObj: {},
                approvalSubunitList: []
            })
        //case constants.RESET_FORM_TYPE:
            // return state.merge({
            //     formtype: '',
            //     tra: {
            //         legal_firstname: '',
            //         legal_lastname:''
            //     },
            //     showSuccessToast: false
            // });
        default:
            return state;
    }
}

export default reducer;