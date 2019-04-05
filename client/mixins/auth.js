import {
    SET_AUTH,
    UNSET_AUTH,
    POST_RESEND_EMAIL_CONFIRM
} from '@store/modules/auth/actions'

export default {
    computed: {
        /**
         * Check if the user is currently authenticated
         *
         * @return {Boolean}
         *
         */
        auth() {
            return this.$store.getters.isAuthenticated
        },

        /**
         * Returns the authenticated user
         *
         * @return {Object|Null}
         *
         */
        user() {
            return this.$store.state.auth.user
        },

        /**
         * Check if user has confirmed email
         *
         * @return {Object|Null}
         *
         */
        confirmed() {
            return !!this.$store.state.auth.user.emailConfirmedAt
        }
    },

    methods: {
        /**
         * Set the authenticated user to state and local storage
         *
         * @param {Object} payload
         *
         * @return {Null}
         *
         */
        setAuth(payload) {
            localStorage.setItem('auth', JSON.stringify(payload))

            this.$store.commit(SET_AUTH, payload)
        },

        /**
         * Logout the user
         *
         * @return {Null}
         *
         */
        unsetAuth() {
            localStorage.removeItem('auth')

            this.$store.commit(UNSET_AUTH)

            this.flash('Successfully logged out.')
        },

        /**
         * Resend confirm email mail to user
         *
         * @return {Null}
         *
         */
        resentConfirmEmail() {
            this.$store
                .dispatch(POST_RESEND_EMAIL_CONFIRM)
                .then(() => {
                    this.flash('Email confirm mail resent.')
                })
                .catch(() => {
                    this.flash('Error resending email.', 'error')
                })
        }
    }
}
