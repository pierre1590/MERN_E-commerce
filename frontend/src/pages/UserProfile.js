import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import{Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import { getUserDetails,deleteUser } from '../actions/userActions'


const UserProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
  
    const userDetails = useSelector((state) => state.userDetails);
    const {loading,error,user} = userDetails;
  
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;
  
    
 
  
      useEffect(() => {
        if (!userInfo) {
          navigate('/login')
        } else {
          if(!user.name ) {
            dispatch(getUserDetails('profile'))
          } else {
            setName(user.name)
            setEmail(user.email)
          }
        }
      }, [dispatch,navigate,  userInfo, user]);
  
    const submitHandler = (e) => {
      e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }else {
           // DISPATCH UPDATE USER PROFILE
        }
    };

    
      
      const deleteAccount = () => {
        dispatch(deleteUser('profile'));
        setTimeout(()=>{
          setMessage("Account deleted successfully");
        },10000)
      }


    return (
      <Row>
        <Col md={3}>
          <h1>User Profile</h1>
          {message && <Message variant="success">{message}</Message>}
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
            <Button
              variant="primary"
              type="submit"
              style={{ margin: "4% 40%" }}
            >
              Update
            </Button>
          </Form>
        </Col>
        <Col md={2} xs={9} xl={2}  >
          <Button 
              variant="danger" 
              type="submit" 
              onClick={deleteAccount}
              >
            Delete account
          </Button>
        </Col>
      </Row>
    );
  }
  
  export default UserProfile