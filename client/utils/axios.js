import Axios from 'axios'
import store from '@store'

const axios = Axios.create({
    baseURL: '/api/v1/'
})

/**
 * Set token as header on every outgoing request if user is authenticated
 *
 * @return {null}
 *
 */
axios.interceptors.request.use(config => {
    if (store.getters.isAuthenticated) {
        config.headers = {
            access_token: store.state.auth.token
        }
    }

    return config
})

export default axios
