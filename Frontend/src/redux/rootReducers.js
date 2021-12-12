import { combineReducers } from 'redux';
import authReducer from './login_user/reducer';
const rootReducers = combineReducers({
    auth:authReducer,
})

export default rootReducers;
