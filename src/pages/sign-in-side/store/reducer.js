import { fromJS } from 'immutable';

const defaultState = fromJS({
    login : false,
    login_processing: false,
});

export default function reducer (state = defaultState, action ) {
    switch (action.type) {
        default :
            return state;
    }
}