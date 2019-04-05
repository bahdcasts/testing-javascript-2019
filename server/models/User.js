import config from '@config'
import Bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import Mail from '@fullstackjs/mail'
import randomstring from 'randomstring'
import PasswordReset from '@models/PasswordReset'

export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: Date,
    updatedAt: Date,
    password: String,
    emailConfirmedAt: Date,
    emailConfirmCode: String
})

/**
 * Hash and save the user's password before
 * saving to the database
 *
 * @return {null}
 */
UserSchema.pre('save', async function() {
    this.password = Bcrypt.hashSync(this.password)
    this.emailConfirmCode = randomstring.generate()
})

/**
 * Send user email confirmation code after registration.
 *
 * @return {null}
 */
UserSchema.post('save', async function() {
    await this.sendEmailVerificationEmail()
})

/**
 * Compare password with user's hashed password on file.
 *
 * @return {boolean}
 */
UserSchema.methods.comparePasswords = function(password) {
    return Bcrypt.compareSync(password, this.password)
}

/**
 * Generate a jwt for this user.
 *
 * @return {string}
 */
UserSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, config.jwtSecret)
}

/**
 * Send account confirmation email
 *
 * @return {Promise}
 */
UserSchema.methods.sendEmailVerificationEmail = function() {
    return new Mail('confirm-email')
        .to(this.email)
        .subject('Please confirm your email address.')
        .data({
            name: this.name,
            url: `${config.url}/auth/emails/confirm/${this.emailConfirmCode}`
        })
        .send()
}

/**
 * Handle forgot password for user.
 *
 * @return {Promise}
 */
UserSchema.methods.forgotPassword = async function() {
    const token = randomstring.generate(32)

    await PasswordReset.create({
        token,
        email: this.email,
        createdAt: new Date()
    })

    await this.sendForgotPasswordEmail(token)
}

/**
 * Send a password reset email to this user.
 *
 * @return {Promise}
 */
UserSchema.methods.sendForgotPasswordEmail = async function(token) {
    await new Mail('forgot-password')
        .to(this.email)
        .subject('You requested for a password reset.')
        .data({
            name: this.name,
            url: `${config.url}/auth/passwords/reset/${token}`
        })
        .send()
}

export default mongoose.model('User', UserSchema)
