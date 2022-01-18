import React, {useState, useEffect} from 'react'
import {Link,useSearchParams,useNavigate} from 'react-router-dom'
import{Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    
    

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
  
    const dispatch = useDispatch();
  
    const userRegister = useSelector((state) => state.userRegister);
    const {loading,error,userInfo} = userRegister; 
  
  
    const redirect = searchParams.search
      ? searchParams.search.split("=")[1]
      : "/";
  
  
      useEffect(() => {
          if(userInfo){
              navigate(redirect);
          }
      }, [userInfo,redirect,navigate]);
  
    const submitHandler = (e) => {
      e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }else {
            dispatch(register(name, email, password));
        }
    
    };


    return (
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{margin:'4% 40%'}}>
            Register
          </Button>
        </Form>
  
        <Row className="py-3">
          <Col style={{margin:'2% 30%'}}>
           Have an account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} >
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    );
  }
  
  export default SignUp