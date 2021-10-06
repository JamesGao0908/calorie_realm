import { fromJS } from 'immutable';

const defaultState = fromJS({
    userData : '',
    recorders : [],
    dailyLimitation : '',
});

export default function reducer (state = defaultState, action ) {
    switch (action.type) {
        case 'load_user_recorders':{
            return state.set( 'recorders', fromJS(action.value) );
        }
        case 'loading_daily_limitation' : {
            return state.set( 'dailyLimitation', fromJS(action.value) );
        }
        default :
            return state;
    }
}