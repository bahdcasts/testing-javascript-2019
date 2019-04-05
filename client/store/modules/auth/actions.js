import client from '@client/utils/axios'

export const SET_AUTH = 'SET_AUTH'
export const UNSET_AUTH = 'UNSET_AUTH'

export const POST_LOGIN = 'POST_LOGIN'
export const POST_REGISTER = 'POST_REGISTER'
export const POST_EMAIL_CONFIRM = 'POST_EMAIL_CONFIRM'
export const POST_RESET_PASSWORD = 'POST_RESET_PASSWORD'
export const POST_FORGOT_PASSWORD = 'POST_FORGOT_PASSWORD'
export const POST_RESEND_EMAIL_CONFIRM = 'POST_RESEND_EMAIL_CONFIRM'

export default {
    /**
     * Make API request to register a user
     *
     * @return {Promise}
     *
     */
    [POST_REGISTER]: (context, data) => client.post('auth/register', data),

    /**
     * Make API request to login a user
     *
     * @return {Promise}
     *
     */
    [POST_LOGIN]: (context, data) => client.post('auth/login', data),

    /**
     * Make API request to send password reset link to a user
     *
     * @return {Promise}
     *
     */
    [POST_FORGOT_PASSWORD]: (context, data) =>
        client.post('auth/passwords/email', data),

    /**
     * Make API request to reset user password.
     *
     * @return {Promise}
     *
     */
    [POST_RESET_PASSWORD]: (context, data) =>
        client.post('auth/passwords/reset', data),

    /**
     * Make API request to resend confirmation email to user.
     *
     * @return {Promise}
     *
     */
    [POST_RESEND_EMAIL_CONFIRM]: () =>
        client.post('auth/emails/confirm/resend'),

    /**
     * Make API request to confirm user email.
     *
     * @return {Promise}
     *
     */
    [POST_EMAIL_CONFIRM]: (context, data) =>
        client.post('auth/emails/confirm', data)
}
