import { Router } from 'express'
import authController from '@controllers/auth.controller'

import authMiddleware from '@middleware/auth'

import loginValidator from '@validators/login'
import registerValidator from '@validators/register'
import resetPasswordValidator from '@validators/reset-password'
import forgotPasswordValidator from '@validators/forgot-password'
import emailConfirmationValidator from '@validators/email-confirmation'

/** Create a new auth router  */
const authRouter = new Router()

/** Route for generating jsonwebtoken for an already existing user */
authRouter.post('/login', loginValidator, authController.login)

/** Route for registering a new user  */
authRouter.post('/register', registerValidator, authController.register)

/** Route for requesting a password reset email  */
authRouter.post(
    '/passwords/email',
    forgotPasswordValidator,
    authController.forgotPassword
)

/** Route for resetting user password  */
authRouter.post(
    '/passwords/reset',
    resetPasswordValidator,
    authController.resetPassword
)

authRouter.post(
    '/emails/confirm',
    emailConfirmationValidator,
    authController.emailConfirm
)

/** Route for resending confirmation email  */
authRouter.post(
    '/emails/confirm/resend',
    authMiddleware,
    authController.resendEmailConfirm
)

export default authRouter
