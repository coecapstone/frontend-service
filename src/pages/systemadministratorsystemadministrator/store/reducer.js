import * as constants from './actionCreators';
import { fromJS, filter, remove, set } from 'immutable';

const defaultState = fromJS({
    systemadministrator: [],
    systemAdministratorNetIDChosen: '',
});

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case constants.INPUT_SYSTEM_ADMIN_NAME:
            return state.set('systemAdministratorNetIDChosen', action.data);
        case constants.GET_ALL_SYSTEM_ADMINISTRATORS:
            return state.set('systemadministrator', action.data);
        case constants.INSERT_SYSTEM_ADMINISTRATOR:
             return state.update('systemadministrator', arr => arr.push(action.data));
        case constants.REMOVE_SYSTEM_ADMINISTRATOR:
            return state.update('systemadministrator', arr => arr.filter(data => data.get('key') !== action.data));
        case constants.CLEAR_INPUT:
            return state.set('systemAdministratorNetIDChosen', '');
        case constants.CHANGE_TO_LOGOUT:
            return state.merge({
                systemadministrator: [],
                systemAdministratorNetIDChosen: '',
            });
        default:
            return state;
    }
}

export default reducer;