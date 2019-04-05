export const FLASH_MESSAGE = 'FLASH_MESSAGE'
export const CLEAR_FLASH_MESSAGE = 'CLEAR_FLASH_MESSAGE'

export default {
    /**
     * Flash a message
     *
     * @param {Object} state
     *
     * @param {Object} payload
     *
     * @return {Null}
     *
     */
    [FLASH_MESSAGE](state, payload) {
        state.messages = [...state.messages, payload]
    },

    /**
     * Clear a flash message with id
     *
     * @param {Object} state
     *
     * @param {String} id
     *
     * @return {Null}
     *
     */
    [CLEAR_FLASH_MESSAGE](state, id) {
        state.messages = state.messages.filter(message => message.id !== id)
    }
}
