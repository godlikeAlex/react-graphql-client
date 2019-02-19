import {combineReducers} from 'redux';
import * as actionTypes from '../action-types';

const initialUserState = {
    currentUser: null,
    isLoading: true
};

const userReducer = (state = initialUserState, action) => {
    const { payload, type } = action;

    switch(type) {
        case actionTypes.CURRENT_USER:
            return {
                currentUser: payload.currentUser,
                isLoading: false
            };
        case actionTypes.LOGOUT_USER:
            return initialUserState;    
        default:
            return state;    
    }
};

const rootReducer = combineReducers({
    user: userReducer
});

export default rootReducer;