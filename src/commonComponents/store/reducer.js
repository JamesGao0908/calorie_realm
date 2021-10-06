import { fromJS } from 'immutable';

const defaultState = fromJS({
});

export default function reducer (state = defaultState, action ) {
    switch (action.type) {
        default :
            return state;
    }
}