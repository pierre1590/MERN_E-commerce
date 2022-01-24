import React, {useState, useEffect} from 'react'
import {Link,useSearchParams,useNavigate} from 'react-router-dom'
import{Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {loading,error,userInfo} = userLogin; 

  const userDelete = useSelector((state) => state.userDelete)
    const {success} = userDelete;    

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
    dispatch(login(email, password));
  }

  


  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Account deleted successfully</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
        {/*Create a checkbox for remember email user with function rememberMeHandler */}
        
        <Button variant="primary" type="submit" style={{margin:'4% 40%'}}>
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col style={{margin:'2% 30%'}}>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Login
