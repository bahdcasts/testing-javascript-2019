import { Router } from 'express'
import authRouter from '@routes/v1/auth'

const v1Router = new Router()

v1Router.use('/auth', authRouter)

export default v1Router
