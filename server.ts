import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { createConnection } from 'typeorm'
import { User } from './entities/User'
import { Statement } from './entities/Statement'
import  AuthController  from './app/Auth/AuthController'
import StatementController from './app/Statement/StatementController'

const app = express()

dotenv.config()

const main = async () => {

	app.use(morgan('dev'))
	app.use(cors())
	app.use(express.json())
	app.use('/api/auth', AuthController)
	app.use('/api/statement', StatementController)
	const PORT = process.env.PORT || 3000

	try {
		await createConnection ({
		type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "test",
    synchronize: true,
    entities: [User, Statement]
	})
	}catch(err) {
		console.log('error')
	}
	app.listen (PORT, () => (console.log(`Server started on ${PORT}`)))
}

main()