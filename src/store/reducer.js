import { combineReducers } from 'redux-immutable';
import { reducer as signInReducer } from '../pages/sign-in-side/store/';
import { reducer as dashBoardReducer } from '../pages/dashboard/store/';

const mainReducer = combineReducers ({
    signIn : signInReducer,
    dashboard : dashBoardReducer,
})

export default mainReducer;
