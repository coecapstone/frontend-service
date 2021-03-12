import { combineReducers } from 'redux-immutable';
import { reducer as contentReducer } from '../common/content/store';


const reducer = combineReducers({
    content: contentReducer
})

export default reducer;