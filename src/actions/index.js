import * as actionTypes from '../action-types';

export const setCurrentUser = user => {
    return {
        type: actionTypes.CURRENT_USER ,
        payload: {
            currentUser: user
        }
    }
};

export const logOut = () => {
    return {
        type: actionTypes.LOGOUT_USER
    }
};