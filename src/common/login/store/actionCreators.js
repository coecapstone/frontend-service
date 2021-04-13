import axios from 'axios';
import { fromJS } from 'immutable';

export const CHANGE_TO_LOGIN = 'login/CHANGE_TO_LOGIN';
export const CHANGE_TO_LOGOUT = 'login/CHANGE_TO_LOGOUT';
export const CHANGE_APPROVER_SUBUNIT_LIST = 'login/CHANGE_APPROVER_SUBUNIT_LIST';
export const CHANGE_FISCAL_STAFF_SUBUNIT_LIST = 'login/CHANGE_FISCAL_STAFF_SUBUNIT_LIST';
export const CHANGE_APPROVAL_INFO = 'login/CHANGE_APPROVAL_INFO';
export const CHANGE_ROLE = 'login/CHANGE_ROLE';
export const CHANGE_CHOOSE_ROLE = 'login/CHANGE_CHOOSE_ROLE';

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
export const changeChooseRole = (hasChoseRole) => ({
    type: CHANGE_CHOOSE_ROLE,
    hasChoseRole
})
var role = '';
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
// .then() 
// 如果返回新的Promise, 那么下一级.then()会在新的Promise状态改变之后执行
// 如果返回其他任何值, 则会立即执行下一级.then()
export const initializeUserData = (netId) => {
    return (dispatch) => {
        return checkWhetherUserIsSystemAdministrator(netId)
            .then(res => {
                role = '';
                console.log('1 -- checkWhetherUserIsSystemAdministrator', res) 
                if (res === 1) role = 'system administrator';
            })
            .then(res => getSubunitListAsFiscalStaff(netId))
            .then(res => getSubunitListAsApprover(netId))
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
    return axios.get(`http://localhost:8080/api/getSubunitListAsFiscalStaff/${netId}`)
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
            console.log('2 -- fiscalStaffSubunitList')
            console.log(fiscalStaffSubunitList.length)
            if (fiscalStaffSubunitList.length > 0 && role === '') role = 'fiscal staff';
            console.log(role)
        })
        .catch(error => {
            console.log(error)
        })
}
const getSubunitListAsApprover = (netId) => {
    return axios.get(`http://localhost:8080/api/getSubunitListAsApprover/${netId}`)
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
            console.log('3 -- approverSubunitList')
            console.log(approverSubunitList.length)
            if (approverSubunitList.length > 0 && role === '') role = 'approver';
            console.log(role)
        })
        .catch(error => {
            console.log(error)
        })
}
