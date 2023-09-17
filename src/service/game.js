import axios from '../utils/axiosConfig'


export const getAllGames = async () => {
    const url = 'api/games'

    const response = await axios.get(url)

    return response.data
}

export const getLatestGames = async (count = 3) => {
    const url = 'api/games/latest'

    const response = await axios.get(url, {
        params: {
            count,
        }
    })

    return response.data
}

export const getGameData = async (gameCode) => {
    const url = `api/games/${gameCode}`

    const response = await axios.get(url)

    return response.data
}

export const getDemoGameResult = async (gameId) => {
    const url = `api/games/${gameId}/demo`

    const response = await axios.get(url)

    return response.data
}

export const getGameResult = async (gameId, postData) => {
    const url = `api/games/${gameId}/result`

    const response = await axios.post(url, postData)

    return response.data
}