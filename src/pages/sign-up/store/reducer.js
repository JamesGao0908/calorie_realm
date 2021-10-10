import { fromJS } from 'immutable';

const defaultState = fromJS({
  emailExisting: false,
  passwordError:'',
  passwordHelper:'',
  userCreated: false,
});

export default function reducer (state = defaultState, action ) {
  switch (action.type) {
    case 'validate_existing_email':{
      if(action.value === 0 || action.value === "0"){
        return state.merge( {'emailExisting': false} );
      }else{
        return state.merge( {'emailExisting': true} );
      }
    }
    case 'user_created':{
      return state.merge( {'userCreated': true} );
    }
    default :
      return state;
  }
}