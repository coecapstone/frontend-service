import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    formToSubmit: {
        unit: '',
        subunit: '',
        formtype: '',
    },
    static: {
        list: [],
        unit: [],
        subunit: [],
    },
    showSuccessToast: false,
    tra: {
        legal_firstname: '',
        legal_lastname: '',
        departure: '',
        destination: '',
        reason: '',
    }
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.READ_FORM_TYPE: 
            return state.setIn(['formToSubmit','formtype'], action.data);
        case constants.READ_INPUT_UNIT: 
            return state.setIn(['formToSubmit','unit'], action.data);
        case constants.READ_INPUT_SUBUNIT:
            return state.setIn(['formToSubmit','subunit'], action.data);
        case constants.GET_SUBUNITS:
            return state.setIn(['static','subunit'], action.data);
        case constants.GET_FORMLIST:
            return state.setIn(['static', 'list'], action.data);
        case constants.GET_ALL_UNITS:
            return state.setIn(['static', 'unit'], action.data);
        case constants.UPDATE_FIRSTNAME:
            return state.setIn(['tra', 'legal_firstname'], action.value);
        case constants.UPDATE_LASTNAME:
            return state.setIn(['tra', 'legal_lastname'], action.value);
        case constants.UPDATE_DEPARTURE:
            return state.setIn(['tra', 'departure'], action.value);
        case constants.UPDATE_DESTINATION:
            return state.setIn(['tra', 'destination'], action.value);
        case constants.UPDATE_REASON:
            return state.setIn(['tra', 'reason'], action.value);
        case constants.SUBMIT_TRAVEL_REQUEST_FORM:
            return state.merge({
                formToSubmit: {
                    unit: '',
                    subunit: '',
                    formtype: '',
                },
                tra: {
                    legal_firstname: '',
                    legal_lastname: '',
                    departure: '',
                    destination: '',
                    reason: '',
                },
                showSuccessToast: true
            });
        case constants.CREATE_ANOTHER_REQUEST:
            return state.setIn(['showSuccessToast'], false);
        case constants.RESET_FORM_TYPE:
        case constants.CHANGE_TO_LOGOUT:
            return state.merge({
                formToSubmit: {
                    unit: '',
                    subunit: '',
                    formtype: '',
                },
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