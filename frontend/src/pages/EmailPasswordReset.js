import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useSearchParams, Link } from "react-router-dom";
import FormContainer from '../components/FormContainer';
import Message from '../components/Message'
import Loader from '../components/Loader/Loader'
import {useDispatch,useSelector} from 'react-redux'
import { sentEmail } from "../actions/userActions";



const EmailPasswordReset = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('')

  const redirect = searchParams.search
    ? searchParams.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();


  const emailSent = useSelector((state) => state.emailSent);
  const {loading:loadingEmail, error:errorEmail, success:successEmail   } = emailSent;


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sentEmail(email));
  };




  return (
    <>
    <FormContainer>
      <Card>
        <Card.Header>
          <h1>Email for password reset</h1>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <h3>Email Password Reset</h3>
          </Card.Title>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                  type="email" 
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                   />
            </Form.Group>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                <p>I remember the password</p>
            </Link>
            <Button
              variant="primary"
              type="submit"
              style={{ margin: "0 72%" }}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
    </>
  );
};

export default EmailPasswordReset;
