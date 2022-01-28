import React, {useState, useEffect } from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import {  Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import { 
  detailsOrder, 
  payOrder,deliverOrder } from '../actions/orderActions'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET} from '../constants/orderConstants'
import {DateTime} from 'luxon'
import { FaUser} from 'react-icons/fa'


 const OrderScreen = () => {
   const [sdkReady, setSdkReady] = useState(false)

    const { id : orderId } = useParams()
   
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    
     const orderPay = useSelector((state) => state.orderPay);
    const { loading:loadingPay, success:successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading:loadingDeliver, success:successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
      if (!userInfo) {
        navigate('/login')
      }

      const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal')
        
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
          setSdkReady(true)
        }
        document.body.appendChild(script)
      }
  

      if (!order || successPay || successDeliver) {
        dispatch({ type: ORDER_PAY_RESET })
        dispatch({ type: ORDER_DELIVER_RESET })
        dispatch(detailsOrder(orderId))
      } else if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript()
        } else {
          setSdkReady(true)
        }
      }
    }, [navigate, dispatch, orderId, successPay, order, successDeliver,userInfo])


    const successPaymentHandler = (paymentResult) => {
      console.log(paymentResult)
      dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
      dispatch(deliverOrder(order))
    }
    

   //Calculates prices
    if(!loading && !error){
      const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }
  order.totalPrice = addDecimals(order.totalPrice)
      order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
    }
    

    return loading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      <>
        <Link to="/profile" className="btn btn-light">
            <FaUser />
            Profile
        </Link>
        <h1 style={{ textTransform: "uppercase" }}>Order n. {orderId}</h1>
        <p style={{ textTransform: "uppercase",fontSize: "20px"}}><span> {DateTime.fromISO(order.createdAt).toFormat("ccc yyyy/MM/dd HH:mm:ss ZZZZ z ")}</span></p>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 style={{ textTransform: "uppercase" }}>Shipping</h2>
                <strong>Name: </strong>
                {order.user.name}
                <p>
                  <strong>E-mail:</strong>{" "}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>  
                <p>
                  <strong>Address:</strong> {order.shippingAddress.address},
                  {order.shippingAddress.postalCode}{" "}
                  {order.shippingAddress.city} ,{order.shippingAddress.province}
                  , {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on{" "}
                    {DateTime.fromISO(order.deliveredAt).toFormat("ccc yyyy/MM/dd HH:mm:ss ZZZZ z")} 
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2 style={{ textTransform: "uppercase" }}>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">
                    Paid on {DateTime.fromISO(order.paidAt).toFormat('ccc yyyy/MM/dd HH:mm:ss ZZZZ z')}
                  </Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2 style={{ textTransform: "uppercase" }}>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col md={4}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x{" "}
                            {item.price.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "EUR",
                            })}{" "}
                            ={" "}
                            {(item.qty * item.price).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2 style={{ textTransform: "uppercase" }}>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{order.itemsPrice} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>
                      {order.shippingPrice.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>
                      {order.taxPrice.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>{order.totalPrice} €</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && 
                userInfo.isAdmin && 
                order.isPaid && 
                !order.isDelivered && (
                <ListGroup.Item>
                    <Button 
                        type="button" 
                        className="btn btn-block"
                        onClick={deliverHandler}
                      >
                          Mark As Delivered
                        </Button>
                </ListGroup.Item>
              )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    );}


export default OrderScreen
