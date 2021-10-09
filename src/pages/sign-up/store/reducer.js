import { fromJS } from 'immutable';

const defaultState = fromJS({
  // emailError:'',
  emailExisting:'',
  passwordError:'',
  passwordHelper:'',
});

export default function reducer (state = defaultState, action ) {
  switch (action.type) {
    default :
      return state;
  }
}