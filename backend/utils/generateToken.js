import jwt from 'jsonwebtoken'

const generateToken = (id, option) => {
	if (option === 'access') {
		return jwt.sign({ id }, process.env.JWT_SECRET, {
			expiresIn: 60 * 60, // 1 hour
		});
	}  else if (option === 'email') {
		return jwt.sign({ id }, process.env.JWT_EMAIL_TOKEN_SECRET, {
			expiresIn: 60 * 15, // 15 minutes
		});
	} else if (option === 'forgot password') {
		return jwt.sign({ id }, process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET, {
			expiresIn: 60 * 10, // 10 minutes
		});
	} else {
		
	}
};

export default generateToken