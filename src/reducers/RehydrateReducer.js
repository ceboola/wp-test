import {REHYDRATE_STORE} from '../actions/constants';

export default (state = false, action) => {
    switch (action.type) {
        case REHYDRATE_STORE:
            return true;
        default:
            return state;
    }
};
