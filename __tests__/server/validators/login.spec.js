/**
 * @jest-environment node
 */
import loginValidator from '@validators/login'

describe('The login validator', () => {
    it('should call the next function when validation succeeds', async () => {
        const req = {
            body: {
                email: 'a@b.com',
                password: 'password'
            }
        }

        const res = {}
        const next = jest.fn()

        await loginValidator(req, res, next)

        expect(next).toHaveBeenCalled()
    })
})
