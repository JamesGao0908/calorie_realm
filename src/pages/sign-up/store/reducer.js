import { fromJS } from 'immutable';

const defaultState = fromJS({
  // emailError:'',
  emailExisting: false,
  passwordError:'',
  passwordHelper:'',
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
    default :
      return state;
  }
}