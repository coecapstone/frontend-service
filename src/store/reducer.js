import { combineReducers } from 'redux-immutable';
// import { reducer as headerReducer } from '../common/header/store';
import { reducer as submittercreaterequestReducer } from '../pages/submittercreaterequest/store';
import { reducer as loginReducer } from '../common/login/store';
import { reducer as submittermyrequestsReducer } from '../pages/submittermyrequests/store';
import { reducer as approvalRequestReducer } from '../pages/approverapproverequests/store';
import { reducer as systemAdministratorUnitAndSubunitReducer } from '../pages/systemadministratorunitandsubunit/store';
import { reducer as systemAdministratorSystemAdministrator } from '../pages/systemadministratorsystemadministrator/store';
import { reducer as systemAdministratorBudget } from '../pages/systemadministratorbudget/store';


const reducer = combineReducers({
    login: loginReducer,
    submittercreaterequest: submittercreaterequestReducer,
    submittermyrequest: submittermyrequestsReducer,
    approvalrequest: approvalRequestReducer,
    systemadministratorunitandsubunit: systemAdministratorUnitAndSubunitReducer,
    systemadministratorsystemadministrator: systemAdministratorSystemAdministrator,
    systemadministratorbudget: systemAdministratorBudget,
})

export default reducer;