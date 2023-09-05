import axios from 'axios'
import store from '../store/store'

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL
axios.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}
axios.defaults.timeout = 30000
axios.defaults.withCredentials = true

axios.interceptors.request.use(
    (config) => {
        const state = store.getState()

        if (state.auth.user) {
            config.headers.Authorization = `${state.auth.user.token}`
        }

        return config
    }
);

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error && error.response && error.response.status === 401) {
            window.location.href = '/logout'
        }

        return Promise.reject(error)
    }
)

export default axios
