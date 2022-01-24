 import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import{Form,Button,Row,Col, Modal, Table} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import { getUserDetails,deleteUser, updateUserProfile } from '../actions/userActions'
import {listMyOrders} from '../actions/orderActions'
import {FaTimes} from 'react-icons/fa'
import {DateTime} from 'luxon'

const UserProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false)

    const handleClose = (state) => setShow(false)
    const handleShow = (state) => setShow(true)

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
  
    const userDetails = useSelector((state) => state.userDetails);
    const {loading,error,user} = userDetails;
  
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;
  
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const {success} = userUpdateProfile;

    const orderListMy = useSelector((state) => state.orderListMy);
    const {loading : loadingOrders, error: errorOrders, orders} = orderListMy;
  
 
      useEffect(() => {
        if (!userInfo ) {
          navigate('/login')
        } else {
          if(!user.name) {
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
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
           dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    };

    
      
      const deleteAccount = () => {
          dispatch(deleteUser('profile'));
      }





    return (
      <Row>
        <Col md={3}>
          <h1 style={{textTransform: 'uppercase'}}>User Profile</h1>
          {success && (
            <Message variant="success" duration="8" dismissible>
              Profile Updated
            </Message>
          )}
          {message && (
            <Message variant="danger" dismissible>
              {message}
            </Message>
          )}
          {error && (
            <Message variant="danger" duration="10" dismissible>
              {error}
            </Message>
          )}
          {loading && <Loader />}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" style={{ margin: "10px" }}>
              Update
            </Button>
          </Form>
        </Col>
        <Col md={8} >
          <Button variant="danger" onClick={handleShow}>
            Delete Account
          </Button>
          <Modal 
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} 
            onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{fontSize:20}}>Are you sure you want to delete your account?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={deleteAccount}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col md={8} xs={12}>
          <h1 style={{textTransform: 'uppercase'}}>My Orders</h1>
          {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead style={{textAlign: 'center'}}>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr style={{textAlign: 'center'}} key={order._id}>
                  <td>{order._id}</td>
                  {/*Convert oreder.createdAt from YYYY/MM/DD to DD/MM/YYYY with luxon*/}
                  <td>{DateTime.fromISO(order.createdAt).toFormat('yyyy/MM/dd HH:mm:ss ZZZZ')}</td>
                  <td>{order.totalPrice.toFixed(2)} €</td>
                  <td>
                    {order.isPaid ? (
                      DateTime.fromISO(order.paidAt).toFormat('yyyy/MM/dd HH:mm:ss ZZZZ') 
                    ) : (
                      <FaTimes style={{color:'red'}} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                     <FaTimes style={{color:'red'}} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        </Col>
      </Row>
    );
  }
  
  export default UserProfile 