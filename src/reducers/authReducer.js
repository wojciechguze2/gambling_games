import { SET_USER, LOGOUT } from '../types/authTypes'

let storedUser

try {
    storedUser = localStorage.getItem('user');
    storedUser = storedUser ? JSON.parse(storedUser) : null
} catch (e) {
    storedUser = null
}

const initialState = {
    user: storedUser,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            localStorage.setItem('user', JSON.stringify(action.payload))

            return {
                ...state,
                user: action.payload,
            };
        case LOGOUT:
            localStorage.removeItem('user')

            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer
