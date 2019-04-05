import { LoginSchema } from '@server/validation-schemas'

/**
 * Validates the login request
 *
 * @param {Object} req
 *
 * @param {Object} res
 *
 * @param {Function} next
 *
 * @return {Object}
 */
export default async (req, res, next) => {
    const { email, password } = req.body

    try {
        await LoginSchema.validate({
            email,
            password
        })

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
