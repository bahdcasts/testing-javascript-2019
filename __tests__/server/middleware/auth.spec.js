/**
 * @jest-environment node
 */
import User from '@models/User'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '@config'
import authMidleware from '@middleware/auth'

class Response {
    status(status) {
        this.status = status

        return this
    }

    json(data) {
        return data
    }
}


describe('The auth middleware', () => {
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

    it('should call the next function if authentication is successful', async () => {
        const access_token = createdUser.generateToken()

        const req = {
            body: {
                access_token
            }
        }

        const res = new Response()
        const next = jest.fn()

        await authMidleware(req, res, next)

        expect(next).toHaveBeenCalled()
    })

    it('should return a 401 if authentication fails', async () => {
        const req = {
            body: {}
        }

        const res = new Response()
        const statusSpy = jest.spyOn(res, 'status')
        const jsonSpy = jest.spyOn(res, 'json')
        const next = jest.fn()

        await authMidleware(req, res, next)

        expect(next).toHaveBeenCalledTimes(0)
        expect(statusSpy).toHaveBeenCalledWith(401)
        expect(jsonSpy).toHaveBeenCalledWith({
            message: 'Unauthenticated.'
        })
    })


    afterAll(async () => {
        await mongoose.connection.close()
    })
})
