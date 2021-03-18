import { combineReducers } from 'redux-immutable';
// import { reducer as headerReducer } from '../common/header/store';
import { reducer as contentReducer } from '../pages/content/store';
import { reducer as loginReducer } from '../pages/login/store';
import { reducer as requestsReducer } from '../pages/requests/store';
import { reducer as approvalRequestReducer } from '../pages/approvalrequest/store';


const reducer = combineReducers({
    //header: headerReducer,
    content: contentReducer,
    login: loginReducer,
    request: requestsReducer,
    approvalrequest: approvalRequestReducer
})

export default reducer;