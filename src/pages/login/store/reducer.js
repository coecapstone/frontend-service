import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    login: false,
    profileObj: {}
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.CHANGE_LOGIN: 
            //return state.set('login', action.value);
            return state.merge({
                login: action.value,
                profileObj: action.data
            });
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