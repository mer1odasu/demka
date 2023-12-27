import jwt from 'jsonwebtoken'

export const generateToken:(id:number) => string = id => {
	const token =
	jwt.sign({
		id,
	},
	"asdfasdfasdgsdf",{
		expiresIn: '10d'
	}
	)
	return token
}
