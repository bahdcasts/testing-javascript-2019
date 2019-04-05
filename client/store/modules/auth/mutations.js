import { SET_AUTH, UNSET_AUTH } from './actions'

export default {
    /**
     * Set the authenticated user
     *
     * @param {Object} state
     *
     * @return {Null}
     *
     */
    [SET_AUTH](state, { user, token }) {
        state.user = user
        state.token = token
    },

    /**
     * Logout the authenticated user
     *
     * @param {Object} state
     *
     * @return {Null}
     *
     */
    [UNSET_AUTH](state) {
        state.user = null
        state.token = null
    }
}
