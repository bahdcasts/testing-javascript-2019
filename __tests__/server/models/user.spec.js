/**
 * @jest-environment node
 */
import User from '@models/User'
import mongoose from 'mongoose'
import Bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '@config'

describe('The User model', () => {
    const user = {
        name: 'Test User',
        email: 'test@user.com',
        password: 'password'
    }
    let createdUser

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/auth-app_test', { useNewUrlParser: true })
        createdUser = await User.create(user)
    })

    it('should hash the user password before saving to the database', async () => {
        expect(Bcrypt.compareSync(user.password, createdUser.password)).toBe(true)
    })

    it('should set the email confirm code for the user before saving to the database', async () => {
        expect(createdUser.emailConfirmCode).toEqual(expect.any(String))
    })

    describe('The generateToken method', () => {
        it('should generate a valid jwt for a user', () => {
            const token = createdUser.generateToken()

            const { id } = jwt.verify(token, config.jwtSecret)

            expect(id).toEqual(JSON.parse(JSON.stringify(createdUser._id)))
        })
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})
