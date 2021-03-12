import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    formtype: '',
    list: [],
    showSuccessToast: false,
    tra: {
        legal_firstname: '',
        legal_lastname: ''
    }
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.READ_FORM_TYPE: 
            return state.set('formtype', action.data);
        case constants.GET_FORMLIST:
            return state.set('list', action.data);
        case constants.UPDATE_FIRSTNAME:
            return state.setIn(['tra', 'legal_firstname'], action.value);
        case constants.UPDATE_LASTNAME:
            return state.setIn(['tra', 'legal_lastname'], action.value);
        case constants.SUBMIT_FORM:
            return state.merge({
                formtype: '',
                tra: {
                    legal_firstname: '',
                    legal_lastname:''
                },
                showSuccessToast: true
            });
        case constants.CREATE_ANOTHER_REQUEST:
            return state.setIn(['showSuccessToast'], false);
        case constants.RESET_FORM_TYPE:
            return state.merge({
                formtype: '',
                tra: {
                    legal_firstname: '',
                    legal_lastname:''
                },
                showSuccessToast: false
            });
        default:
            return state;
    }
}

export default reducer;