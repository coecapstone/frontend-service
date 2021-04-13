import * as constants from './actionCreators';
import { fromJS, remove, set } from 'immutable';

const defaultState = fromJS({
    formToSubmit: {
        unit: '',
        subunit: '',
        formtype: '',
        budget_numbers:[],
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
        departing_date: '',
        returning_date: '',
        reason: '',
        budget_list: [ 
            { budget_number: '', amount: '' },
        ],
        whether_pay_flight: '',
        whether_pay_flight_form: {
            birthday: '',
            airline: '',
            flight_number: '',
            flight_from: '',
            going_to: '',
            whether_to_pay_departing_date: '',
            whether_to_pay_returning_date: '',
            whether_to_pay_amount: '',
            flight_reference: ''
        }
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
        case constants.CHANGE_BUDGET_NUMBERS: 
            return state.setIn(['formToSubmit','budget_numbers'], action.data);
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
        case constants.UPDATE_DEPARTURE_DATE:
            return state.setIn(['tra', 'departing_date'], action.value);
        case constants.UPDATE_RETURNING_DATE:
            return state.setIn(['tra', 'returning_date'], action.value);
        case constants.UPDATE_REASON:
            return state.setIn(['tra', 'reason'], action.value);
        case constants.READ_INPUT_BUDGET:
            return state.setIn(['tra', 'budget_list', action.idx, 'budget_number'], action.data);
        case constants.READ_INPUT_AMOUNT:
            return state.setIn(['tra', 'budget_list', action.idx, 'amount'], action.data);
        case constants.ADD_MORE_BUDGET_NUMBER:
            return state.updateIn(['tra', 'budget_list'], arr => arr.push(action.value));
        case constants.REMOVE_BUDGET_NUMBER:
            return state.updateIn(['tra', 'budget_list'], arr => remove(arr, action.idx));
        case constants.READ_PAY_FLIGHT:
            return state.setIn(['tra', 'whether_pay_flight'], action.data);
        case constants.UPDATE_BIRTHDAY:
            return state.setIn(['tra', 'whether_pay_flight_form', 'birthday'], action.data);
        case constants.UPDATE_AIRLINE:
            return state.setIn(['tra', 'whether_pay_flight_form', 'airline'], action.data);
        case constants.UPDATE_FLIGHT_NUMBER:
            return state.setIn(['tra', 'whether_pay_flight_form', 'flight_number'], action.data);
        case constants.UPDATE_FLIGHT_FROM:
            return state.setIn(['tra', 'whether_pay_flight_form', 'flight_from'], action.data);
        case constants.UPDATE_GOING_TO:
            return state.setIn(['tra', 'whether_pay_flight_form', 'going_to'], action.data);
        case constants.UPDATE_WHETHER_TO_PAY_AMOUNT:
            return state.setIn(['tra', 'whether_pay_flight_form', 'whether_to_pay_amount'], action.data);
        case constants.UPDATE_WHETHER_TO_PAY_DEPARTING_DATE: 
            return state.setIn(['tra', 'whether_pay_flight_form', 'whether_to_pay_departing_date'], action.value);
        case constants.UPDATE_WHETHER_TO_PAY_RETURNING_DATE: 
            return state.setIn(['tra', 'whether_pay_flight_form', 'whether_to_pay_returning_date'], action.value);
        case constants.UPDATE_FLIGHT_REFERENCE:
            return state.setIn(['tra', 'whether_pay_flight_form', 'flight_reference'], action.value);
        case constants.SUBMIT_TRAVEL_REQUEST_FORM:
            return state.merge(fromJS({
                formToSubmit: { unit: '', subunit: '', formtype: '', budget_numbers:[] },
                tra: {
                    legal_firstname: '',
                    legal_lastname: '',
                    departure: '',
                    destination: '',
                    departing_date: '',
                    returning_date: '',
                    reason: '',
                    budget_list: [ 
                        { budget_number: '', amount: '' },
                    ],
                    whether_pay_flight: '',
                    whether_pay_flight_form: {
                        birthday: '',
                        airline: '',
                        flight_number: '',
                        flight_from: '',
                        going_to: '',
                        whether_to_pay_departing_date: '',
                        whether_to_pay_returning_date: '',
                        whether_to_pay_amount: '',
                        flight_reference: ''
                    }
                },
                showSuccessToast: true
            }));
        case constants.CREATE_ANOTHER_REQUEST:
            return state.setIn(['showSuccessToast'], false);
        case constants.RESET_FORM_TYPE:
        case constants.CHANGE_TO_LOGOUT:
            return state.merge(fromJS({
                formToSubmit: { unit: '', subunit: '', formtype: '', budget_numbers:[] },
                tra: {
                    legal_firstname: '',
                    legal_lastname: '',
                    departure: '',
                    destination: '',
                    departing_date: '',
                    returning_date: '',
                    reason: '',
                    budget_list: [ 
                        { budget_number: '', amount: '' },
                    ],
                    whether_pay_flight: '',
                    whether_pay_flight_form: {
                        birthday: '',
                        airline: '',
                        flight_number: '',
                        flight_from: '',
                        going_to: '',
                        whether_to_pay_departing_date: '',
                        whether_to_pay_returning_date: '',
                        whether_to_pay_amount: '',
                        flight_reference: ''
                    }
                },
                showSuccessToast: false
            }));
        default:
            return state;
    }
}

export default reducer;