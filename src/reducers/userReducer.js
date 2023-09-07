import {
    SET_USER,
    LOGOUT,
    SET_USER_ACCOUNT_BALANCE,
    UPDATE_USER_ACCOUNT_BALANCE
} from '../types/authTypes'
import { STATE_USER_STORAGE_KEY } from '../utils/constants'

let storedUser

try {
    storedUser = localStorage.getItem(STATE_USER_STORAGE_KEY);
    storedUser = storedUser ? JSON.parse(storedUser) : null
} catch (e) {
    storedUser = null
}

const initialState = {
    user: storedUser,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            localStorage.setItem(STATE_USER_STORAGE_KEY, JSON.stringify(action.payload))

            return {
                ...state,
                user: action.payload,
            };
        case LOGOUT:
            localStorage.removeItem(STATE_USER_STORAGE_KEY)

            return {
                ...state,
                user: null,
            };
        case SET_USER_ACCOUNT_BALANCE:
            if (state.user) {
                state.user.accountBalance = action.payload
            }

            localStorage.setItem(STATE_USER_STORAGE_KEY, JSON.stringify(state.user))

            return state;
        case UPDATE_USER_ACCOUNT_BALANCE:
            if (state.user) {
                state.user.accountBalance += action.payload
            }

            localStorage.setItem(STATE_USER_STORAGE_KEY, JSON.stringify(state.user))

            return state;
        default:
            return state;
    }
};

export default userReducer
