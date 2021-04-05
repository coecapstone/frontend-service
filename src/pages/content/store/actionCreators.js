import axios from 'axios';
import { fromJS } from 'immutable';

export const GET_ALL_UNITS = 'content/get_all_units';
export const GET_FORMLIST = 'content/get_formlist';
export const READ_FORM_TYPE = 'content/read_form_type';
export const READ_INPUT_UNIT = 'content/read_input_unit';
export const READ_INPUT_SUBUNIT = 'content/read_input_subunit';
export const GET_SUBUNITS = 'content/GET_SUBUNITS';
export const CREATE_ANOTHER_REQUEST = 'content/create_another_request';
export const RESET_FORM_TYPE = 'content/reset_form_type';
export const CHANGE_TO_LOGOUT = 'content/CHANGE_TO_LOGOUT';

const getFormListAction = (data) => ({
    type: GET_FORMLIST,
    data: fromJS(data)
});

const getAllUnitsAction = (data) => ({
    type: GET_ALL_UNITS,
    data: fromJS(data)
});

const getSubunits = (data) => ({
    type: GET_SUBUNITS,
    data: fromJS(data)
});

const inputUnit = (data) => ({
    type: READ_INPUT_UNIT,
    data
})

export const createAnotherRequest = () => ({
    type: CREATE_ANOTHER_REQUEST
});

export const resetFormType = () => ({
    type: RESET_FORM_TYPE
});

export const readFormType = (data) => ({
    type: READ_FORM_TYPE,
    data
});

export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})

export const getFormList = () => {
    return (dispatch) => {
        axios.get('http://localhost:8080/api/getAllForms')
            .then(res => {
                dispatch(getFormListAction(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
};

export const readInputSubunit = (data) => ({
    type: READ_INPUT_SUBUNIT,
    data
})

export const readInputUnit = (unit) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/getSubunits/${unit}`)
            .then(res => {
                // console.log(res)
                let allSubunitsList = [];
                res.data.map(item => {
                    const subunit = {};
                    subunit.key = item;
                    subunit.text = item;
                    subunit.value = item;
                    allSubunitsList.push(subunit);
                });
                console.log(allSubunitsList);
                dispatch(inputUnit(unit));
                dispatch(getSubunits(allSubunitsList));
            })
            .catch((error) => {
                console.log(error)
            })
    }
};

export const getAllUnitsList = () => {
    return (dispatch) => {
        axios.get('http://localhost:8080/api/getAllUnits')
            .then(res => {
                let allUnitsList = [];
                res.data.map(item => {
                    const unit = {};
                    unit.key = item;
                    unit.text = item;
                    unit.value = item;
                    allUnitsList.push(unit);
                });
                dispatch(getAllUnitsAction(allUnitsList));
            })
            .catch((error) => {
                console.log(error)
            })
    }
};

export const UPDATE_FIRSTNAME = 'content/UPDATE_FIRSTNAME';
export const UPDATE_LASTNAME = 'content/UPDATE_LASTNAME';
export const UPDATE_DEPARTURE = 'content/UPDATE_DEPARTURE';
export const UPDATE_DESTINATION = 'content/UPDATE_DESTINATION';
export const UPDATE_DEPARTURE_DATE = 'content/UPDATE_DEPARTURE_DATE';
export const UPDATE_RETURNING_DATE = 'content/UPDATE_RETURNING_DATE';
export const UPDATE_REASON = 'content/UPDATE_REASON';
export const SUBMIT_TRAVEL_REQUEST_FORM = 'content/SUBMIT_TRAVEL_REQUEST_FORM';

export const updateFirstNameAction = (value) => ({
    type: UPDATE_FIRSTNAME,
    value
})
export const updateLastNameAction = (value) => ({
    type: UPDATE_LASTNAME,
    value
})
export const updateDepartureAction = (value) => ({
    type: UPDATE_DEPARTURE,
    value
})
export const updateDestinationAction = (value) => ({
    type: UPDATE_DESTINATION,
    value
})
export const updateDepartureDate = (value) => ({
    type: UPDATE_DEPARTURE_DATE,
    value
})
export const updateReturningDate = (value) => ({
    type: UPDATE_RETURNING_DATE,
    value
})
export const updateReasonAction = (value) => ({
    type: UPDATE_REASON,
    value
})
const submitTravelRequestFormAction = () => ({
    type: SUBMIT_TRAVEL_REQUEST_FORM
})

export const submitTravelRequestForm = (formToSubmitData) => {
    return (dispatch) => {
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formToSubmitData)
        }
        console.log('formToSubmitData')
        console.log(formToSubmitData)
        console.log(options)
        fetch('http://localhost:8080/api/saveTravelRequestForm', options)
            .then(res => {
                console.log(res)
                // save to session story
                dispatch(submitTravelRequestFormAction())
            })
            .catch(error => {
                console.log(error)
            })
    }
}
