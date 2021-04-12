import * as constants from './actionCreators';
import { fromJS, remove, set } from 'immutable';

const defaultState = fromJS({
    unit: [],
    subunit: [],
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.GET_ALL_UNITS:
            return state.set('unit', action.data);
        case constants.GET_SUBUNITS:
            return state.set('subunit', action.data);
        case constants.CHANGE_TO_LOGOUT:
                return state.merge({
                    unit: [],
                });
        default:
            return state;
    }
}

export default reducer;