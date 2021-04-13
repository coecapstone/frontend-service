import { combineReducers } from 'redux-immutable';
// import { reducer as headerReducer } from '../common/header/store';
import { reducer as contentReducer } from '../pages/submittercreaterequest/store';
import { reducer as loginReducer } from '../common/login/store';
import { reducer as requestsReducer } from '../pages/submittermyrequests/store';
import { reducer as approvalRequestReducer } from '../pages/approverapproverequests/store';
import { reducer as systemAdministratorUnitAndSubunitReducer } from '../pages/systemadministratorunitandsubunit/store';
import { reducer as systemAdministratorSystemAdministrator } from '../pages/systemadministratorsystemadministrator/store';
import { reducer as systemAdministratorBudget } from '../pages/systemadministratorbudget/store';


const reducer = combineReducers({
    //header: headerReducer,
    content: contentReducer,
    login: loginReducer,
    request: requestsReducer,
    approvalrequest: approvalRequestReducer,
    systemadministratorunitandsubunit: systemAdministratorUnitAndSubunitReducer,
    systemadministratorsystemadministrator: systemAdministratorSystemAdministrator,
    systemadministratorbudget: systemAdministratorBudget,
})

export default reducer;