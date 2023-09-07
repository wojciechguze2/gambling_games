import { STATE_GAMES_STORAGE_KEY } from '../utils/constants'
import { SET_GAMES } from '../types/gameTypes'

let storedGames

try {
    storedGames = localStorage.getItem(STATE_GAMES_STORAGE_KEY);
    storedGames = storedGames ? JSON.parse(storedGames) : null
} catch (e) {
    storedGames = null
}

const initialState = {
    games: storedGames,
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GAMES:
            localStorage.setItem(STATE_GAMES_STORAGE_KEY, JSON.stringify(action.payload))

            return {
                ...state,
                games: action.payload,
            };
        default:
            return state;
    }
};

export default gameReducer
