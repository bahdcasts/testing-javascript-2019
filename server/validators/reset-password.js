import * as Yup from 'yup'
import User from '@models/User'
import PasswordReset from '@models/PasswordReset'
import { ResetPasswordSchema } from '@server/validation-schemas'

/**
 * Validates the login request
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Object}
 */
export default async (req, res, next) => {
    const { email, token, password } = req.body

    try {
        await ResetPasswordSchema.validate({
            password,
            token,
            email
        })

        const passwordReset = await PasswordReset.findOne({ email, token })

        if (!passwordReset) {
            throw new Yup.ValidationError(
                'Invalid password reset token.',
                req.body,
                'email'
            )
        }

        const authUser = await User.findOne({
            email
        })

        req.authUser = authUser

        return next()
    } catch (error) {
        return res.status(422).json({
            message: 'Validation failed.',
            data: {
                errors: {
                    [error.path]: error.message
                }
            }
        })
    }
}
