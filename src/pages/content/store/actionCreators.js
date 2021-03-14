import axios from 'axios';
import { fromJS } from 'immutable';

export const GET_ALL_UNITS = 'content/get_all_units';
export const GET_FORMLIST = 'content/get_formlist';
export const READ_FORM_TYPE = 'content/read_form_type';
export const READ_INPUT_UNIT = 'content/read_input_unit';
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

export const readInputUnit = (data) => ({
    type: READ_INPUT_UNIT,
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
                dispatch(getAllUnitsAction(allUnitsList))
            })
            .catch((error) => {
                console.log(error)
            })
    }
};

export const UPDATE_FIRSTNAME = 'content/UPDATE_FIRSTNAME';
export const UPDATE_LASTNAME = 'content/UPDATE_LASTNAME';
export const SUBMIT_FORM = 'content/SUBMIT_FORM';

export const updateFirstNameAction = (value) => ({
    type: UPDATE_FIRSTNAME,
    value
})
export const updateLastNameAction = (value) => ({
    type: UPDATE_LASTNAME,
    value
})
const submitFormAction = () => ({
    type: SUBMIT_FORM
})

export const submitForm = (firstName, lastName) => {
    return (dispatch) => {
        const data = {
            "legal_firstname": firstName, 
            "legal_lastname": lastName
        }
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        console.log(data)
        console.log(options)
        fetch('http://localhost:8080/api/saveFormData', options)
            .then(res => {
                console.log(res)
                // save to session story
                dispatch(submitFormAction())
            })
            .catch(error => {
                console.log(error)
            })
    }
}