
import axios from 'axios';
import { fromJS } from 'immutable';

export const GET_SUBUNIT_REQUESTS = 'content/GET_SUBUNIT_REQUESTS';
export const SET_REQUEST_DETAIL = 'content/SET_REQUEST_DETAIL';
export const BACK_TO_REQUESTS = 'content/BACK_TO_REQUESTS';
export const CHANGE_TO_LOGOUT = 'content/CHANGE_TO_LOGOUT';

export const backToRequests = () => ({
    type: BACK_TO_REQUESTS
});

export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})

const getSubunitRequestsAction = (data) => ({
    type: GET_SUBUNIT_REQUESTS,
    data: fromJS(data)
});

const setRequestDetailAction = (data, id) => ({
    type: SET_REQUEST_DETAIL,
    id, 
    data: fromJS(data)
});

export const getSubunitRequests = (unit, subunit) => {
    return (dispatch) => {
        const unitWithoutSpace = unit.replaceAll(' ', '-');
        const subunitWithoutSpace = subunit.replaceAll(' ', '-');
        axios.get(`http://localhost:8080/api/getSubunitRequests/${unitWithoutSpace}/${subunitWithoutSpace}`)
            .then(res => {
                console.log(res.data)
                dispatch(getSubunitRequestsAction(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
};

export const changeDetailId = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/getRequestDetail/${id}`)
            .then(res => {
                console.log(res.data)
                dispatch(setRequestDetailAction(res.data, id))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const approvalRequest = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/approvalRequest/${id}`)
            .then(res => {
                //console.log(res.data)
                //dispatch(setRequestDetailAction(res.data, id))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}