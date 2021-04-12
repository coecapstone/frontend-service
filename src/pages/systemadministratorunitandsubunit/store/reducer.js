import * as constants from './actionCreators';
import { fromJS, filter, remove, set } from 'immutable';

const defaultState = fromJS({
    unit: [],
    subunit: [],
    unitChosen: '',
    subunitChosen: '',
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.INPUT_UNIT_NAME:
            return state.merge({
                subunit: [],
                unitChosen: action.data,
                subunitChosen: '',
            });
        case constants.INPUT_SUBUNIT_NAME:
            return state.set('subunitChosen', action.data);
        case constants.GET_ALL_UNITS:
            return state.set('unit', action.data);
        case constants.GET_SUBUNITS:
            return state.set('subunit', action.data);
        case constants.INSERT_UNIT:
            return state.update('unit', arr => arr.push(action.data));
        case constants.REMOVE_UNIT:
            return state.update('unit', arr => arr.filter(data => data.get('key') !== action.data));
        case constants.INSERT_SUBUNIT:
            return state.update('subunit', arr => arr.push(action.data));
        case constants.REMOVE_SUBUNIT:
            return state.update('subunit', arr => arr.filter(data => data.get('key') !== action.data));
        case constants.CLEAR_SUBUNIT_INPUT:
            return state.set('subunitChosen', '');
        case constants.CLEAR_INPUT_AND_SUBUNIT:
            return state.merge({
                subunit: [],
                unitChosen: '',
                subunitChosen: '',
            });
        case constants.CHANGE_TO_LOGOUT:
            return state.merge({
                unit: [],
                subunit: [],
                unitChosen: '',
                subunitChosen: '',
            });
        default:
            return state;
    }
}

export default reducer;