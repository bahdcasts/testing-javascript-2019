import Bcrypt from 'bcryptjs'
import User from '@models/User'
import PasswordReset from '@models/PasswordReset'

/**
 * Handle user login endpoint
 *
 * @param {Object} req
 * @param {Object} res
 */
const login = async (req, res) => {
    const { email, password } = req.body

    const failureResponse = () =>
        res.status(401).json({
            data: {
                errors: {
                    email: 'These credentials do not match our records.'
                }
            },
            message: 'These credentials do not match our records.'
        })

    const user = await User.findOne({ email })

    if (!user) {
        return failureResponse()
    }

    const passwordIsCorrect = user.comparePasswords(password)

    if (!passwordIsCorrect) {
        return failureResponse()
    }

    const token = await user.generateToken()

    return res.json({
        data: {
            user,
            token
        },
        message: 'Login successful.'
    })
}

/**
 * Handle user registration endpoint
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @return
 */
const register = async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.generateToken()

    return res.json({
        data: {
            user,
            token
        },
        message: 'Account registered.'
    })
}

/**
 * Request password reset for a user
 *
 * @param {Object} req
 * @param {Object} res
 * @return
 */
const forgotPassword = async (req, res) => {
    await req.authUser.forgotPassword()

    return res.json({
        message: 'Forgot password email sent.'
    })
}

/**
 * Reset user's password
 *
 * @param {Object} req
 * @param {Object} res
 * @return
 */
const resetPassword = async (req, res) => {
    const { password } = req.body

    await User.findOneAndUpdate(
        { email: req.authUser.email },
        { password: Bcrypt.hashSync(password) }
    )

    await PasswordReset.findOneAndDelete({ email: req.authUser.email })

    return res.json({
        message: 'Password has been reset.'
    })
}

/**
 * Resend email confirmation email
 *
 * @param {Object} req
 * @param {Object} res
 */
const resendEmailConfirm = async (req, res) => {
    if (!req.authUser.emailConfirmedAt) {
        await req.authUser.sendEmailVerificationEmail()
    }

    return res.json({
        message: 'Email confirmation resent.'
    })
}

/**
 * Confirm user's account with email confirmation token
 *
 * @param {Object} req
 * @param {Object} res
 */
const emailConfirm = async (req, res) => {
    const user = await User.findOneAndUpdate(
        { email: req.authUser.email },
        {
            emailConfirmCode: null,
            emailConfirmedAt: new Date()
        },
        { new: true }
    )

    const token = user.generateToken()

    return res.json({
        message: 'Email confirmed.',
        data: {
            user,
            token
        }
    })
}

export default {
    login,
    register,
    emailConfirm,
    resetPassword,
    forgotPassword,
    resendEmailConfirm
}
