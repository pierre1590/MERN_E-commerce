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
      from: { name: "E-SHOP", address: process.env.EMAIL }, // sender address
      to: email,
      title: "Activation Account",
      subject: "Confirm your email for E-SHOP", // Subject line
	  headers: {
		'X-Laziness-level': 1000,
		'X-Spam-Score':0,
		'X-Spam-Status':'No, score=-10.0, status=GOOD',
		'X-Spam-Flag':'No',
		'X-Spam-Checker-Version':'SpamAssassin 3.3.1 (2014-03-17) onrs-ord-vm3',
		'X-Spam-Report':'{ ... }',
		'X-Spam-Report-Version':'3.3.1',
		'X-Spam-Tests':'{ ... }',
		
	  },
      html: `<div>
			<h2>Account Created!</h2>
			Click this link to 
			<a href="${url}">verify your account</a>

			<br>
			Note that this link is valid only for the next 15 minutes.
		</div>
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
	  title: "Reset Password",
      subject: "Reset Password for E-SHOP", // Subject line
      html: `
	  <div>
	  <h2>Reset Password for your E-SHOP account</h2>
	  <br/>
	  Forgot your password? No worries! Just click this link to 
	  <a > reset your password</a>. 
	  <br>
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


