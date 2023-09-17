import axios from '../utils/axiosConfig'

export const getUser = async () => {
    const url = 'api/user'

    return await axios.get(url)
}

export const registerUser = async (postData) => {
    const url = 'api/user/register'

    return await axios.post(url, postData)
}

export const loginUser = async (postData) => {
    const url = 'api/user/login'

    return await axios.post(url, postData)
}

export const addAccountBalance = async (value = 1000) => {
    return await axios.patch('api/user/account-balance/add', { value })
}

export const getAccountBalance = async () => {
    const url = 'api/user/account-balance'

    return await axios.get(url)
}

export const deleteAccount = async () => {
    const url = 'api/user'

    return await axios.delete(url)
}