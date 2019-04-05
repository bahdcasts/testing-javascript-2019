export default {
    /**
     * Checks if the user is currently authenticated
     *
     * @param {Object} state
     *
     * @return {Boolean}
     *
     */
    isAuthenticated(state) {
        return !!state.user && !!state.token
    }
}
