/**
 * @jest-environment node
 */
import User from '@models/User'
import server from '@server/app'
import supertest from 'supertest'
import { disconnect } from '@tests/utils/mongoose'

const app = () => supertest(server)

describe('The register process', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    it('should register a new user', async () => {
        const response = await app().post('/api/v1/auth/register').send({
            name: 'Test User',
            email: 'test@user.com',
            password: 'password'
        })

        expect(response.status).toBe(200)
        expect(response.body.data.token).toBeDefined()
        expect(response.body.message).toBe('Account registered.')
    })

    afterAll(async () => {
        await disconnect()
    })
})
