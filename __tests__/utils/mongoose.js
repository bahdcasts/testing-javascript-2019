import mongoose from 'mongoose'

export const connect = () => mongoose.connect('mongodb://localhost:27017/auth-app_test', { useNewUrlParser: true })

export const disconnect = () => mongoose.connection.close()
