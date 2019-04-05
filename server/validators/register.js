import * as Yup from 'yup'
import User from '@models/User'
import { RegisterSchema } from '@server/validation-schemas'

/**
 * Validates the registration request
 *
 * @param {Object} req
 *
 * @param {Object} res
 *
 * @param {Function} next
 *
 *
 * @return {Object}
 */
export default async (req, res, next) => {
    const { name, email, password } = req.body

    try {
        await RegisterSchema.validate({
            name,
            email,
            password
        })

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw new Yup.ValidationError(
                'This email has already been taken.',
                req.body,
                'email'
            )
        }

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
