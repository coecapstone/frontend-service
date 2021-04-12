import axios from 'axios';
import { fromJS } from 'immutable';

export const CHANGE_TO_LOGOUT = 'content/CHANGE_TO_LOGOUT';
export const GET_ALL_UNITS = 'content/GET_ALL_UNITS';
export const GET_SUBUNITS = 'content/GET_SUBUNITS';

export const logout = () => ({
    type: CHANGE_TO_LOGOUT
})

const getAllUnitsAction = (data) => ({
    type: GET_ALL_UNITS,
    data: fromJS(data)
});

const getSubunits = (data) => ({
    type: GET_SUBUNITS,
    data: fromJS(data)
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