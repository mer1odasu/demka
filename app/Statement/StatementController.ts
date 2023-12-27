import {Router} from 'express'
import { Statement } from '../../entities/Statement'
import jwt from 'jsonwebtoken'
import { User } from '../../entities/User'

const router = Router()

router.post('/', async (req, res) => {
	const {description, car_number} = req.body
	const token = req.headers.authorization?.split(" ")[1]
	let decoded
	if(token) {
		decoded = jwt.verify(token, "asdfasdfasdgsdf")
	} else {
		res.json('Invalid token').status(403)
	}
	if(decoded) {
		const statement = new Statement
		statement.description = description
		statement.car_number = car_number
		statement.status = 'new'
		statement.user = (decoded as jwt.JwtPayload).id
		await statement.save()
		res.json(statement)
	}
})

.get('/users', async (req, res) => {
	const token = req.headers.authorization?.split(" ")[1]
	let decoded
	if(token) {
		decoded = jwt.verify(token, "asdfasdfasdgsdf")
	} else {
		res.json('Invalid token').status(403)
	}
	if(decoded) {
		const statement = await Statement.findBy({
			user: (decoded as jwt.JwtPayload).id 
		})
		res.json(statement)
	}else {
		res.json('No statement')
	}
})

.get("/:id", async (req, res) => {
	const token = req.headers.authorization?.split(" ")[1]
	let decoded
	if(token) {
		decoded = jwt.verify(token, "asdfasdfasdgsdf")
	} else {
		res.json('Invalid token').status(403)
	}
	if(decoded) {
		const statement = await Statement.findOneBy({
			id: +req.params.id 
		})
		if(statement){
			res.json(statement)
		}else {
			res.json("not found").status(404)
		}
	}
})

.put ("/:id", async (req, res) => {
	const {status} = req.body
	const token = req.headers.authorization?.split(" ")[1]
	let decoded
	if(token) {
		decoded = jwt.verify(token, "asdfasdfasdgsdf")
	} else {
		res.json('Invalid token').status(403)
	}
	if(decoded) {
		const user = await User.findOneBy({
			id: (decoded as jwt.JwtPayload).id
		}) 
		if(user) {
			if(user.admin){
				const statement = await Statement.findOneBy({
					id: +req.params.id
				})
				if(statement) {
					statement.status = status
					await statement.save()
					res.json(statement)
				}else {
					res.json("not found").status(404)
				}
			}else {
				res.json("ne admin").status(403)
			}
		}
	}
})

.get("/", async (req, res) => {
	const token = req.headers.authorization?.split(" ")[1]
	let decoded
	if(token) {
		decoded = jwt.verify(token, "asdfasdfasdgsdf")
	} else {
		res.json('Invalid token').status(403)
	}
	if(decoded) {
		const user = await User.findOneBy({
			id: (decoded as jwt.JwtPayload).id
		}) 
		if(user) {
			if(user.admin){
				const statement = await Statement.find()
				res.json(statement)
			}else {
				res.json("ne admin").status(403)
			}
		}
	}
})

.delete("/:id", async (req, res) => {
	const {status} = req.body
	const token = req.headers.authorization?.split(" ")[1]
	let decoded
	if(token) {
		decoded = jwt.verify(token, "asdfasdfasdgsdf")
	} else {
		res.json('Invalid token').status(403)
	}
	if(decoded) {
		const user = await User.findOneBy({
			id: (decoded as jwt.JwtPayload).id
		}) 
		if(user) {
			if(user.admin){
				const statement = await Statement.findOneBy({
					id: +req.params.id
				})
				if(statement) {
					const forDeleted = await Statement.delete({
						id: +req.params.id
					})
					res.json("deleted")
				}else {
					res.json("not found").status(404)
				}
			}else {
				res.json("ne admin").status(403)
			}
		}
	}
})

export default router
