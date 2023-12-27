import {Router} from 'express'
import { User } from '../../entities/User'
import {hash, verify} from 'argon2'
import { generateToken } from './token'

const router = Router()

router.post('/register', async (req, res) => {
	 const {email, password, login, numberPhone, fullName} = req.body
	 const [lastName, firstName, surname] = fullName.split(' ')
	 const user = new User()
	 user.email = email
	 user.password = await hash(password)
	 user.firstName = firstName
	 user.lastName = lastName
	 user.surname = surname
	 user.login = login
	 user.number_phone = numberPhone
	 user.admin = false
	 await user.save()
	 const token = generateToken(user.id)
	res.json(user)
})

.post('/login', async (req, res) => {
	const {login, password} = req.body
	const user = await User.findOneBy({
		login: login
	})
	if(user) {
		const isValidPass = await verify(user.password, password)
		if(isValidPass) {
			const token = generateToken(user.id)
			res.json({user, token})
			return
		}else {
			res.json("error").status(400)
			return
		}
	} else {
		res.json("error").status(400)
	}
})



export default router