import actions from './actions'
import getters from './getters'
import mutations from './mutations'

let state = null

try {
    state = JSON.parse(localStorage.getItem('auth'))
} catch (e) {}

if (!state) {
    state = {
        user: null,
        token: null
    }
}

export default {
    namespaced: false,
    state,
    actions,
    getters,
    mutations
}
