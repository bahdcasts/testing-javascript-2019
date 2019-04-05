import uuid from 'uuid/v4'
import {
    FLASH_MESSAGE,
    CLEAR_FLASH_MESSAGE
} from '@store/modules/flash/mutations'

export default {
    computed: {
        /**
         * Get the flash messages presently in store.
         *
         * @return {Array}
         *
         */
        messages() {
            return this.$store.state.flash.messages
        }
    },

    methods: {
        /**
         * Flash a message
         *
         * @return {Null}
         *
         */
        flash(message, type = 'success') {
            const id = uuid()

            this.$store.commit(FLASH_MESSAGE, {
                id,
                type,
                message
            })

            setTimeout(() => {
                this.$store.commit(CLEAR_FLASH_MESSAGE, id)
            }, 3000)
        }
    }
}
