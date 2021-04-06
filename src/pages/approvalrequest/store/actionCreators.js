
import axios from 'axios';
import { fromJS } from 'immutable';

export const GET_SUBUNIT_REQUESTS = 'content/GET_SUBUNIT_REQUESTS';
export const SET_REQUEST_DETAIL = 'content/SET_REQUEST_DETAIL';
export const SET_BUDGET_DETAIL = 'content/SET_BUDGET_DETAIL';
export const BACK_TO_REQUESTS = 'content/BACK_TO_REQUESTS';
export const CHANGE_TO_LOGOUT = 'content/CHANGE_TO_LOGOUT';
export const SHOW_APPROVED_MESSAGE = 'content/SHOW_APPROVED_MESSAGE';
export const SHOW_DECLINE_MESSAGE_INPUTBOX = 'content/SHOW_DECLINE_MESSAGE_INPUTBOX';
export const UPDATE_REASON = 'content/UPDATE_REASON';
export const SHOW_DECLINED_TOAST = 'content/SHOW_DECLINED_TOAST';

export const backToRequests = () => ({
    type: BACK_TO_REQUESTS
});
export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
export const showApprovedMessage = () => ({
    type: SHOW_APPROVED_MESSAGE
})
export const showDeclinedToast = () => ({
    type: SHOW_DECLINED_TOAST
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
const setBudgetDetailAction = (data) => ({
    type: SET_BUDGET_DETAIL,
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

export const getRequestDetail = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/getRequestDetail/${id}`)
            .then(res => {
                console.log('getRequestDetail', res.data)
                dispatch(setRequestDetailAction(res.data, id))
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

export const approvalRequest = (id) => {
    return (dispatch) => {
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            }
        }
        fetch(`http://localhost:8080/api/approvalRequest/${id}`, options)
            .then(res => {
                console.log(res)
                dispatch(showApprovedMessage())
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const showDeclineMessageInputBox = () => ({
    type: SHOW_DECLINE_MESSAGE_INPUTBOX
});

export const updateReasonAction = (value) => ({
    type: UPDATE_REASON,
    value
})

export const sendDeclineMessage = (id, reason) => {
    return (dispatch) => {
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reason)
        }
        console.log(options);
        fetch(`http://localhost:8080/api/sendDeclineMessage/${id}`, options)
            .then(res => {
                console.log(res)
                dispatch(showDeclinedToast())
            })
            .catch((error) => {
                console.log(error)
            })
    }
}