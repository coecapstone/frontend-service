import axios from 'axios';
import { fromJS } from 'immutable';

export const CHANGE_TO_LOGOUT = 'systemadministratorsystemadministrator/CHANGE_TO_LOGOUT';
export const GET_ALL_SYSTEM_ADMINISTRATORS = 'systemadministratorsystemadministrator/GET_ALL_SYSTEM_ADMINISTRATORS';
export const INPUT_SYSTEM_ADMIN_NAME = 'systemadministratorsystemadministrator/INPUT_SYSTEM_ADMIN_NAME';
export const INSERT_SYSTEM_ADMINISTRATOR = 'systemadministratorsystemadministrator/INSERT_SYSTEM_ADMINISTRATOR';
export const REMOVE_SYSTEM_ADMINISTRATOR = 'systemadministratorsystemadministrator/REMOVE_SYSTEM_ADMINISTRATOR';
export const CLEAR_INPUT = 'systemadministratorsystemadministrator/CLEAR_INPUT';

export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
const getAllSystemAdministratorAction = (data) => ({
    type: GET_ALL_SYSTEM_ADMINISTRATORS,
    data: fromJS(data)
});
const insertSystemAdministartor = (data) => ({
    type: INSERT_SYSTEM_ADMINISTRATOR,
    data: fromJS({key: data, text: data, value: data})
});
const clearInput = () => ({
    type: CLEAR_INPUT,
});
const removeSystemAdministratorAction = (data) => ({
    type: REMOVE_SYSTEM_ADMINISTRATOR,
    data
});
export const inputSystemAdminName = (data) => ({
    type: INPUT_SYSTEM_ADMIN_NAME,
    data
});
export const getAllSystemAdministratorList = () => {
    return (dispatch) => {
        axios.get('http://localhost:8080/api/getAllSystemAdministrators')
            .then(res => {
                let allSystemAdministratorsList = [];
                res.data.map(item => {
                    const netId = {};
                    netId.key = item;
                    netId.text = item;
                    netId.value = item;
                    allSystemAdministratorsList.push(netId);
                });
                dispatch(getAllSystemAdministratorAction(allSystemAdministratorsList));
            })
            .catch((error) => {
                console.log(error)
            })
    }
};
export const appendSystemAdministrator = (systemAdministratorNetID) => {
    return (dispatch) => {
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            }
        }
        console.log(options)
        fetch(`http://localhost:8080/api/appendSystemAdministrator/${systemAdministratorNetID}`, options)
            .then(res => {
                dispatch(insertSystemAdministartor(systemAdministratorNetID))
                dispatch(clearInput())
            })
            .catch(error => {
                console.log(error)
            })
    }
};
export const removeSystemAdministrator = (systemAdministratorNetID) => {
    return (dispatch) => {
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            }
        }
        console.log(options)
        fetch(`http://localhost:8080/api/removeSystemAdministrator/${systemAdministratorNetID}`, options)
            .then(res => {
                dispatch(removeSystemAdministratorAction(systemAdministratorNetID))
                dispatch(clearInput())
            })
            .catch(error => {
                console.log(error)
            })
    }
};