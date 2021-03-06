import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, InputGroup, FloatingLabel } from 'react-bootstrap';
import Loader from '../components/Loader/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { resetUserPassword } from '../actions/userActions';
import {useNavigate,useParams} from 'react-router-dom';

const PasswordReset = () => {
	const [name, setName] = useState('');
	const [message, setMessage] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const {token} = useParams()
	const dispatch = useDispatch();

	const userResetPassword = useSelector((state) => state.userResetPassword);
	const { loading, success, error } = userResetPassword;

	

	useEffect(() => {
		const nameFromLocalStorage = localStorage.getItem('EcommerceUserName');
		if (nameFromLocalStorage) {
			setName(nameFromLocalStorage);
		}
	}, []);

	useEffect(() => {
		if (success) {
			setTimeout(() => {
				navigate('/login');
			}, 10000);
		}
	}, [ navigate, success]);

	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match. Please retry.');
		} else {
			dispatch(resetUserPassword(token, password));
		}
	};

	return (
		<FormContainer>
			<h1>{name ? `${name}, reset password` : 'Reset Password'}</h1>
			{success ? (
				<Message  variant='success' dismissible duration={8}>
				Password updated successfully. You will be redirected to login page in 10 seconds.
				</Message>
			) : null}
			{message ? (
				<Message dismissible duration={8} variant='warning'>
					{message}
				</Message>
			) : null}
			{error ? (
				<Message dismissible variant='danger' duration={8}>
					{error}
				</Message>
			): null}
			
			
			{loading ? (
				<Loader />
			) : (
				<Form onSubmit={handleSubmit} style={{ width: '33em' }}>
					<Form.Group className='mb-2'>
						<InputGroup style={{ width: '100%' }}>
							<FloatingLabel
								controlId='passwordinput'
								label='Password'
								className='mb-3'>
								<Form.Control
									type='password'
									size='lg'
									placeholder='Enter your password'
									value={password}
									style={{
										borderRight: 'none',
										width: '205%',
									}}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</FloatingLabel>
						</InputGroup>
					</Form.Group>
					<Form.Group className='my-2'>
						<InputGroup style={{ width: '100%' }}>
							<FloatingLabel
								
								controlId='confirmpasswordinput'
								label='Confirm password'
								className='mb-3'>
								<Form.Control
									type='password'
									size='lg'
									placeholder='Confirm your password'
									value={confirmPassword}
									style={{
										borderRight: 'none',
										width: '205%',
									}}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
								/>
							</FloatingLabel>
						</InputGroup>
					</Form.Group>
					<Button
						type='submit'
						style={{
							padding: '0.5em 1em',
							width: '8rem',
						}}>
						Submit
					</Button>
				</Form>
			)}
		</FormContainer>
	);
};

export default PasswordReset;