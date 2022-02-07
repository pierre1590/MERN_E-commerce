import React, { useState } from "react";
import {Card,  Form, Button } from "react-bootstrap";
import {  Link } from "react-router-dom";
import FormContainer from '../components/FormContainer';
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import { sentEmail } from "../actions/userActions";
import Meta from '../components/Meta' 


const EmailPasswordReset = () => {
  //Create a page for send an email to reset password of the Customer
  const [email, setEmail] = useState("");
  

  const dispatch = useDispatch();

  const emailSend = useSelector((state) => state.userEmailSent)
 
 const {loading, emailSent, error} = emailSend || {}


 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(sentEmail(email));
}



  return (
    <>
      <Meta title="Reset Password" description="Reset Password" />
      <FormContainer>
      {loading ? <Loader /> : null}
   {emailSent ? (
     <Message variant='success' dismissible duration={8}>
       {`An email has been sent to   ${email}. Please follow the instructions in the email to reset your password.`}
     </Message> 
   ): null
    }
    {error ? (
      <Message variant='danger' dismissible duration={8}>
        {error}
      </Message>
    ): null
    }
       
      
        
  
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Link to="/login" className="btn btn-link">
                Back to login
              </Link>
              <Button
                variant="primary"
                type="submit"
                style={{ margin: "10px 30%" }}
              >
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