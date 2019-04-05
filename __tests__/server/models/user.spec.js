/**
 * @jest-environment node
 */
import User from '@models/User'
import mongoose from 'mongoose'
import Bcrypt from 'bcryptjs'

describe('The User model', () => {
    it('should hash the user password before saving to the database', async () => {
        await mongoose.connect('mongodb://localhost:27017/auth-app_test', { useNewUrlParser: true })

        const user = {
            name: 'Test User',
            email: 'test@user.com',
            password: 'password'
        }

        const createdUser = await User.create(user)
        expect(Bcrypt.compareSync(user.password, createdUser.password)).toBe(true)
    })
})
