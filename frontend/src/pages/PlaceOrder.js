import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

 const PlaceOrder = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)
   
    

    
    // Calcutate prices
    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0)
    cart.shippingPrice = cart.itemsPrice > 50 ? 0 : 7.99
    cart.taxPrice = Number(cart.itemsPrice * 0.22) 
   
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice )
    

    const orderCreate = useSelector((state) => state.orderCreate)
    const {order, success, error} = orderCreate
    
    useEffect(() => {
        if(success){
          navigate(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    },[success,navigate])

    const placeOrderHandler = () => {
        dispatch(createOrder({
         ...cart,orderItems:cart.cartItems
        }))
       
    }

    return (
      <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                <strong>Address:</strong>{' '}
                  {cart.shippingAddress.address}, 
                  {cart.shippingAddress.postalCode}{' '}
                  {cart.shippingAddress.city}{' '},
                  {cart.shippingAddress.province},{' '}
                  {cart.shippingAddress.country}
              </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
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
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={3}>
                            {item.qty} x{" "}
                            {/*Define item price in  format 1.000,00€ */}
                             {item.price.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "EUR",
                            })}{" "}
                            ={" "}
                            {/*Define {item.qty * item. price in format 1.000€} */}
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
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Items:</Col>
                        <Col>{cart.itemsPrice.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "EUR",
                            })}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax:</Col>
                        <Col>{cart.taxPrice.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "EUR",
                            })}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping:</Col>
                        <Col>{cart.shippingPrice.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "EUR",
                            })}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total:</Col>
                        <Col>{cart.totalPrice.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "EUR",
                            })}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    {/*error message with duration of 10 seconds */}
                    
                      {error && <Message variant="danger" duration='10'>{error}</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                            <Button 
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}>
                                Place Order
                                </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
        </Row>
        <Link to='/cart'>
            <Button 
                variant="primary" 
                >
                Update cart
            </Button>
        </Link>
      </>
    );
}

export default PlaceOrder








































