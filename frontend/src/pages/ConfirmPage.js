import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useNavigate, useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Loader from '../components/Loader/Loader';
import Message from '../components/Message';
import { confirmUser } from '../actions/userActions';
import Meta from '../components/Meta';

const ConfirmPage = () => {
    const navigate = useNavigate()
	const dispatch = useDispatch();
    const {token} = useParams(); 
    

	const userConfirm = useSelector((state) => state.userConfirm); // get the userInfo to check if user is confirmed or not
	const { loading, error, isConfirmed } = userConfirm;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (userInfo) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [userInfo]);

	useEffect(() => {
		// confirm user once the email token is available
		dispatch(confirmUser(token, isLoggedIn));
	}, [dispatch, token, isLoggedIn]);

	if (loading || (!isConfirmed && !error)) {
		return <Loader />;
	} else if (error) {
		// redirect to login page after a 10 seconds
		setTimeout(() => {
			navigate('/login');
		}, 10000);
		return (
			<Message dismissible variant='danger' duration={10}>
				Verfication Failed. Please try to login again.
			</Message>
		);
	} else if (isConfirmed) {
		// set a variable in local storage to fill email aftrer redirecting to login page after email confirmation
		localStorage.setItem('fillEmailOnLoginPage', 'true');
		return (
			<Card style={{ border: 'none', margin: '0 auto' }}>
				<Meta title='Confirm Password | E-SHOP' />
				<Card.Body>
					<Card.Title>Account Confirmed</Card.Title>
					<Card.Text>
						{setIsLoggedIn
							? <Message dismissible variant='success' duration={10}>
									Your account has been successfully verified!
							  </Message>
							: <Message dismissible variant='success' duration={10}>
									Your account has been successfully verified!
									<br />
									<Link to='/login'>Login</Link>
								</Message>}										
					</Card.Text>
					{!setIsLoggedIn ? <Link to='/login'>Login</Link> : null}
				</Card.Body>
			</Card>
		);
	}
};

export default ConfirmPage;