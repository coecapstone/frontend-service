import axios from 'axios';
import { fromJS } from 'immutable';

export const CHANGE_TO_LOGIN = 'login/CHANGE_TO_LOGIN';
export const CHANGE_TO_LOGOUT = 'login/CHANGE_TO_LOGOUT';
export const CHANGE_APPROVER_SUBUNIT_LIST = 'login/CHANGE_APPROVER_SUBUNIT_LIST';
export const CHANGE_FISCAL_STAFF_SUBUNIT_LIST = 'login/CHANGE_FISCAL_STAFF_SUBUNIT_LIST';
export const CHANGE_APPROVAL_INFO = 'login/CHANGE_APPROVAL_INFO';
export const CHANGE_ROLE = 'login/CHANGE_ROLE';

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
export const changeLogin = (profile) => ({
    type: CHANGE_TO_LOGIN,
    profile: fromJS(profile)
})
const changeRole = (role) => ({
    type: CHANGE_ROLE,
    role
})

var fiscalStaffSubunitList = [];
var approverSubunitList = [];
const changeFiscalStaffSubunitList = (fiscalStaffSubunitList) => ({
    type: CHANGE_FISCAL_STAFF_SUBUNIT_LIST,
    fiscalStaffSubunitList: fromJS(fiscalStaffSubunitList)
})
const changeApproverSubunitList = (approverSubunitList) => ({
    type: CHANGE_APPROVER_SUBUNIT_LIST,
    approverSubunitList: fromJS(approverSubunitList)
})
export const initializeUserData = (netId) => {
    var role = '';
    return (dispatch) => {
        return checkWhetherUserIsSystemAdministrator(netId)
            .then(res => {
                console.log('1 -- checkWhetherUserIsSystemAdministrator', res) 
                if (res === 1) role = 'system administrator';
            })
            .then(getSubunitListAsFiscalStaff(netId))
            .then(getSubunitListAsApprover(netId))
            .then(res => {
                console.log('2 -- fiscalStaffSubunitList')
                if (fiscalStaffSubunitList.length > 0 && role === '') role = 'fiscal staff';
            })
            .then(res => {
                console.log('3 -- approverSubunitList')
                if (approverSubunitList.length > 0 && role === '') role = 'approver';
            })
            .then(res => {
                console.log('4 -- role', role)
                dispatch(changeRole(role))
                dispatch(changeFiscalStaffSubunitList(fiscalStaffSubunitList))
                dispatch(changeApproverSubunitList(approverSubunitList))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
const checkWhetherUserIsSystemAdministrator = (netId) => {
    return axios.get(`http://localhost:8080/api/checkWhetherUserIsSystemAdministrator/${netId}`)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            console.log(error)
        })
}
const getSubunitListAsFiscalStaff = (netId) => {
    axios.get(`http://localhost:8080/api/getSubunitListAsFiscalStaff/${netId}`)
        .then(res => {
            fiscalStaffSubunitList = [];
            const data = res.data;
            for(const val in data) {
                const unit = data[val].unitName;
                const subUnit = data[val].subUnitName;
                const text = `${unit}, ${subUnit}`;
                const subunit = {};
                subunit.key = subUnit;
                subunit.text = text;
                subunit.value = `${subUnit}@${unit}`;
                fiscalStaffSubunitList.push(subunit);
            }
            console.log('fiscalStaffSubunitListData', data)
            console.log('fiscalStaffSubunitList', fiscalStaffSubunitList)
            return fiscalStaffSubunitList;
        })
        .catch(error => {
            console.log(error)
        })
}
const getSubunitListAsApprover = (netId) => {
    axios.get(`http://localhost:8080/api/getSubunitListAsApprover/${netId}`)
        .then(res => {
            approverSubunitList = [];
            const data = res.data;
            for(const val in data) {
                const unit = data[val].unitName;
                const subUnit = data[val].subUnitName;
                const text = `${unit}, ${subUnit}`;
                const subunit = {};
                subunit.key = subUnit;
                subunit.text = text;
                subunit.value = `${subUnit}@${unit}`;
                approverSubunitList.push(subunit);
            }
            console.log('approverSubunitList', approverSubunitList)
            return approverSubunitList;
        })
        .catch(error => {
            console.log(error)
        })
}
