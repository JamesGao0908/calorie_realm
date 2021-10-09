import { combineReducers } from 'redux-immutable';
import { reducer as signInReducer } from '../pages/sign-in-side/store/';
import { reducer as dashBoardReducer } from '../pages/dashboard/store/';
import { reducer as registerReducer } from '../pages/sign-up/store/';


const mainReducer = combineReducers ({
    signIn : signInReducer,
    dashboard : dashBoardReducer,
    register: registerReducer,
})

export default mainReducer;
