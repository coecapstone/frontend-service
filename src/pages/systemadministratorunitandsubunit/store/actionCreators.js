import axios from 'axios';
import { fromJS } from 'immutable';

export const CHANGE_TO_LOGOUT = 'systemadministratorunitandsubunit/CHANGE_TO_LOGOUT';
export const GET_ALL_UNITS = 'systemadministratorunitandsubunit/GET_ALL_UNITS';
export const GET_SUBUNITS = 'systemadministratorunitandsubunit/GET_SUBUNITS';
export const INSERT_UNIT = 'systemadministratorunitandsubunit/INSERT_UNIT';
export const REMOVE_UNIT = 'systemadministratorunitandsubunit/REMOVE_UNIT';
export const CLEAR_INPUT_AND_SUBUNIT = 'systemadministratorunitandsubunit/CLEAR_INPUT_AND_SUBUNIT';
export const INPUT_UNIT_NAME = 'systemadministratorunitandsubunit/INPUT_UNIT_NAME';
export const APPEND_UNIT_NAME = 'systemadministratorunitandsubunit/APPEND_UNIT_NAME';

export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})
export const inputUnitName = (data) => ({
    type: INPUT_UNIT_NAME,
    data
})
const getAllUnitsAction = (data) => ({
    type: GET_ALL_UNITS,
    data: fromJS(data)
});
const getSubunits = (data) => ({
    type: GET_SUBUNITS,
    data: fromJS(data)
});
const insertUnit = (data) => ({
    type: INSERT_UNIT,
    data: fromJS({key: data, text: data, value: data})
});
const removeUnit = (data) => ({
    type: REMOVE_UNIT,
    data
});
const clearInputAndSubunit = () => ({
    type: CLEAR_INPUT_AND_SUBUNIT,
});
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
                dispatch(getSubunits(allSubunitsList));
            })
            .catch((error) => {
                console.log(error)
            })
    }
};
export const appendUnitName = (unit) => {
    return (dispatch) => {
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            }
        }
        console.log(options)
        fetch(`http://localhost:8080/api/appendUnitName/${unit}`, options)
            .then(res => {
                dispatch(insertUnit(unit))
                dispatch(clearInputAndSubunit())
            })
            .catch(error => {
                console.log(error)
            })
    }
};
export const removeUnitName = (unit) => {
    return (dispatch) => {
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            }
        }
        console.log(options)
        fetch(`http://localhost:8080/api/removeUnitName/${unit}`, options)
            .then(res => {
                dispatch(removeUnit(unit))
                dispatch(clearInputAndSubunit())
            })
            .catch(error => {
                console.log(error)
            })
    }
};