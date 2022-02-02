import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// configure the transporter for nodemailer to use gmail account to send mails
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
},
tls: {
	rejectUnauthorized: false
}
});

export default transporter;