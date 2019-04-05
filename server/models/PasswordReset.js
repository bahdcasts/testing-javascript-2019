import mongoose from 'mongoose'

export const PasswordResetSchema = new mongoose.Schema({
    email: String,
    token: String,
    createdAt: Date
})

export default mongoose.model('PasswordReset', PasswordResetSchema)
