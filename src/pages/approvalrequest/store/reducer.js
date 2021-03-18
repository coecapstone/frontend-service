import * as constants from './actionCreators';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    requests: { },
    detailRequest: { },
    detailId: '',
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.GET_SUBUNIT_REQUESTS:
            return state.set('requests', action.data);
        case constants.BACK_TO_REQUESTS:
        case constants.CHANGE_TO_LOGOUT:
            return state.merge({
                detailRequest: {},
                detailId: ''
            });
        case constants.SET_REQUEST_DETAIL:
            return state.merge({
                detailRequest: action.data,
                detailId: action.id
            });
        default:
            return state;
    }
}

export default reducer;