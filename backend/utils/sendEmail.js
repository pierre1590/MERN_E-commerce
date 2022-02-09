import dotenv from 'dotenv';
import transporter from '../utils/transporter.js';
import generateToken from '../utils/generateToken.js';

dotenv.config();

const sendEmail = async (id, email, option) => {
	const frontendURL = process.env.FRONTEND_BASE_URL;

	// send email for the email verification option
	if (option === 'email verification') {
		// create a new JWT to verify user via email
		const emailToken = generateToken(id, 'email');
		const url = `${frontendURL}/user/confirm/${emailToken}`;

		// set the correct mail option
		const mailOptions = {
			from:{name:'E-SHOP', address:process.env.EMAIL}, // sender address
			to: email,
			title: 'Activation Account',
			subject: 'Confirm your email for E-SHOP', // Subject line
			html: `<div>
					<h2>Account Created!</h2>
					<p>Please click the link below to verify your email address.</p>
					<a href="${url}">${url}</a>
				
			`,
		};
		console.log(mailOptions);
		const mailSent = await transporter.sendMail(
			mailOptions,
			(err, info) => {
				if (err) {
					console.log(err);
				} else {
					console.log(info);
				}
			}
		);

		// send a promise since nodemailer is async
		if (mailSent) return Promise.resolve(1);
	}
	// send a mail for resetting password if forgot password
	else if (option === 'forgot password') {
		// create a new JWT to verify user via email
		const forgetPasswordToken = generateToken(id, 'forgot password');
		const url = `${frontendURL}/reset/${forgetPasswordToken}`;
		
		const mailOptions = {
      from: { name: "E-SHOP", address: process.env.EMAIL }, // sender address
      to: email,
      subject: "Reset Password for E-SHOP", // Subject line
      html: `
			<div>
			<h2>Reset Password for your E-SHOP account</h2>
			<br/>
			<p>Please click the link below to reset your password.</p>
			<a href="${url}">${url}</a>
			Note that this link is valid for only the next 10 minutes. 
		</div> 
			`,
    }; 

		const mailSent = await transporter.sendMail(
			mailOptions,
			(err, info) => {
				if (err) {
					console.log(err);
				} else {
					console.log(info);
				}
			}
		);

		if (mailSent) return Promise.resolve(1);
	} 

};

export default sendEmail;


