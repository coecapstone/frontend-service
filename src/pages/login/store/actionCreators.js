import axios from 'axios';
import { fromJS } from 'immutable';

export const CHANGE_TO_LOGIN = 'login/CHANGE_TO_LOGIN';
export const CHANGE_TO_LOGOUT = 'login/CHANGE_TO_LOGOUT';
export const CHANGE_APPROVAL_SUBUNIT_LIST = 'login/CHANGE_APPROVAL_SUBUNIT_LIST';
export const CHANGE_APPROVAL_INFO = 'login/CHANGE_APPROVAL_INFO';
export const CHANGE_ROLE_TO_APPROVER = 'login/CHANGE_ROLE_TO_APPROVER';

const changeLogin = (profile) => ({
    type: CHANGE_TO_LOGIN,
    profile: fromJS(profile)
})

const changeApprovalSubunitList = (approvalSubunitList) => ({
    type: CHANGE_APPROVAL_SUBUNIT_LIST,
    approvalSubunitList: fromJS(approvalSubunitList)
})

export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})

export const changeApprovalInfo = (unitSubunitInfo) => {
    const split = unitSubunitInfo.split('@');
    return {
        type: CHANGE_APPROVAL_INFO,
        unit: split[1], 
        subunit: split[0]
    }
}

export const changeRoleToApprover = () => ({
    type: CHANGE_ROLE_TO_APPROVER
})

export const login = (profile) => {
    return (dispatch) => {
        const netId = profile.email.split('@')[0];
        const url = 'http://localhost:8080/api/getUserRole/'+netId;
        axios.get(url)
            .then(res => {
                console.log(res.data);
                const approvalSubunitList = [];
                const data = res.data;
                for(const val in data) {
                    const unit = data[val].unitName;
                    const subUnit = data[val].subUnitName;
                    const text = `${unit}, ${subUnit}`;
                    const subunit = {};
                    subunit.key = subUnit;
                    subunit.text = text;
                    subunit.value = `${subUnit}@${unit}`;
                    approvalSubunitList.push(subunit);
                }
                console.log(approvalSubunitList);
                if (approvalSubunitList.length > 0) {
                    dispatch(changeRoleToApprover());
                }
                dispatch(changeApprovalSubunitList(approvalSubunitList));
                dispatch(changeLogin(profile));
                // save to session story?
                //dispatch(submitFormAction())
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// const getFormListAction = (data) => ({
//     type: GET_FORMLIST,
//     data: fromJS(data)
// });