import React, { useState,useEffect } from "react";
import {Card,  Form, Button } from "react-bootstrap";
import {  Link } from "react-router-dom";
import FormContainer from '../components/FormContainer';
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import {useDispatch,useSelector} from 'react-redux'
import { sentEmail } from "../actions/userActions";
import Meta from '../components/Meta' 


const EmailPasswordReset = () => {
 
 
  //Create a page for send an email to reset password of the Customer
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const dispatch = useDispatch();

  const emailSend = useSelector((state) => state.emailSend);
  const {loading:loadingEmail,error} = emailSend || {};

  const userList = useSelector(state => state.userList)
  const {users} = userList

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSent(true)
    setMessage(`An email has been sent to the address ${email}. Please follow the instructions in the email to reset your password.`);
    dispatch(sentEmail(email));
  }

  useEffect(() => {
    if(message){
      setLoading(false);
      setSuccess(true);
      setMessage(message);
      
    }
  }, [message,users]);

 
 

  





  return ( <>
  <Meta title="Reset Password" description="Reset Password"/>
   {isSent ? (
     <Message variant='success' dismissible duration={8}>
       {message}
     </Message> 
   ): null
    }
    {error ? (
      <Message variant='danger' dismissible duration={8}>
        {error}
      </Message>
    ): null
    }
     <FormContainer>
      <h1>Email Password Reset</h1>
      <Card>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

            </Form.Group>
            <Link
              to='/login'
              className="btn btn-link">
              Back to login
            </Link>
            <Button
              variant="primary"
              type="submit"
              style={{ margin: '10px 30%' }}>
              Send
            </Button>
          </Form>
        </Card.Body>
      </Card> 
    </FormContainer>
   
    
   
    
</>
  );
};


export default EmailPasswordReset