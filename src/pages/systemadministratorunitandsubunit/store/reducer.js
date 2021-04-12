import * as constants from './actionCreators';
import { fromJS, filter, remove, set } from 'immutable';

const defaultState = fromJS({
    unit: [],
    subunit: [],
    unitChosen: '',
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.INPUT_UNIT_NAME:
            return state.set('unitChosen', action.data);
        case constants.GET_ALL_UNITS:
            return state.set('unit', action.data);
        case constants.GET_SUBUNITS:
            return state.set('subunit', action.data);
        case constants.INSERT_UNIT:
            return state.update('unit', arr => arr.push(action.data));
        case constants.REMOVE_UNIT:
            // var newList = fruitList.get('fruits').delete(fruitList.get('fruits').findIndex(fruit => fruit === 'mangoes'))
            // const temp = unit.findIndex(data => data === action.data)
            // console.log(temp)
            return state.update('unit', arr => arr.filter(data => data.get('key') !== action.data));
        case constants.CLEAR_INPUT_AND_SUBUNIT:
            return state.merge({
                subunit: [],
                unitChosen: '',
            });
        case constants.CHANGE_TO_LOGOUT:
            return state.merge({
                unit: [],
                subunit: [],
                unitChosen: '',
            });
        default:
            return state;
    }
}

export default reducer;