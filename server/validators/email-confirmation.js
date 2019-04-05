import * as Yup from 'yup'
import User from '@models/User'
import { EmailConfirmationSchema } from '@server/validation-schemas'

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
    const { token } = req.body

    try {
        await EmailConfirmationSchema.validate({
            token
        })

        const authUser = await User.findOne({
            emailConfirmCode: token
        })

        if (!authUser) {
            throw new Yup.ValidationError(
                'Invalid email confirmation token.',
                req.body,
                'email'
            )
        }

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
