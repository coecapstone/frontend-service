import axios from 'axios';
import { fromJS } from 'immutable';

export const GET_USER_REQUESTS = 'content/GET_USER_REQUESTS';
export const SET_REQUEST_DETAIL = 'content/SET_REQUEST_DETAIL';
export const SET_BUDGET_DETAIL = 'content/SET_BUDGET_DETAIL';
export const SET_WHETHER_PAY_FLIGHT = 'content/SET_WHETHER_PAY_FLIGHT';
export const BACK_TO_REQUESTS = 'content/BACK_TO_REQUESTS';
export const CHANGE_TO_LOGOUT = 'content/CHANGE_TO_LOGOUT';

export const backToRequests = () => ({
    type: BACK_TO_REQUESTS
});
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
const getUserRequestsAction = (data) => ({
    type: GET_USER_REQUESTS,
    data: fromJS(data)
});
const setRequestDetailAction = (data) => ({
    type: SET_REQUEST_DETAIL,
    data: fromJS(data)
});
const setBudgetDetailAction = (data) => ({
    type: SET_BUDGET_DETAIL,
    data: fromJS(data)
});
const setWhetherPayFlightAction = (data) => ({
    type: SET_WHETHER_PAY_FLIGHT,
    data: fromJS(data)
});
export const getUserRequests = (userNetId) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/getUserRequests/${userNetId}`)
            .then(res => {
                console.log('getUserRequests', res.data)
                dispatch(getUserRequestsAction(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
};

export const getRequestDetail = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/getRequestDetail/${id}`)
            .then(res => {
                console.log('getRequestDetail', res.data)
                dispatch(setRequestDetailAction(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const getBudgetDetail = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/getBudgetDetail/${id}`)
            .then(res => {
                console.log('getBudgetDetail', res.data)
                dispatch(setBudgetDetailAction(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export const getWhetherPayFlight = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/getWhetherPayFlight/${id}`)
            .then(res => {
                console.log('getWhetherToPayFlight', res.data)
                dispatch(setWhetherPayFlightAction(res.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}