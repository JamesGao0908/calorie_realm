import { fromJS } from 'immutable';

const defaultState = fromJS({
  loginStatus : false,
  userInfo: '',
  loginError: false,
  loginHelpText: '',
});

export default function reducer (state = defaultState, action ) {
  switch (action.type) {
    case 'load_user_info':{
      return state.merge( {'userInfo': action.data, 'loginStatus' : true} );
    }
    case 'login_fail' :{
      return state.merge( {'loginError': true, 'loginHelpText' : 'Login credentials are wrong'} );
    }
    case 'login_error_reset':{
      return state.merge( {'loginError': false, 'loginHelpText' : ''} );
    }
    default :
      return state;
  }
}