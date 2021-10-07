import { fromJS } from 'immutable';

const defaultState = fromJS({
  loginStatus : false,
  userInfo: ''
});

export default function reducer (state = defaultState, action ) {
  switch (action.type) {
    case 'load_user_info':{
      return state.merge( {'userInfo': action.data, 'loginStatus' : true} );
    }
    default :
      return state;
  }
}