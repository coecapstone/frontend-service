import axios from 'axios';
import { fromJS } from 'immutable';

export const GET_FORMLIST = 'content/get_formlist';
export const READ_FORM_TYPE = 'content/read_form_type';
export const CREATE_ANOTHER_REQUEST = 'content/create_another_request';
export const RESET_FORM_TYPE = 'content/reset_form_type';

export const createAnotherRequest = () => ({
    type: CREATE_ANOTHER_REQUEST
});

export const resetFormType = () => ({
    type: RESET_FORM_TYPE
});

const getFormListAction = (data) => ({
    type: GET_FORMLIST,
    data: fromJS(data)
});

export const readFormType = (data) => ({
    type: READ_FORM_TYPE,
    data
});

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