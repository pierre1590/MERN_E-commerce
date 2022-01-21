import React, { useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import {  Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import { detailsOrder } from '../actions/orderActions'

 const OrderScreen = () => {

    const { id : orderId } = useParams()
    
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;


    useEffect(() => {
        dispatch(detailsOrder(orderId))
    },[])

    // Total price of the items
    
console.log(order)

    return loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <>
        <h1>Order n. {orderId}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                
                <p>
                  <strong>Address:</strong>{' '}
                  {order.shippingAddress.address}, {order.shippingAddress.postalCode}{' '}
                  {order.shippingAddress.city}{' '}
                  ,{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </ListGroup.Item>
  
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant='success'>Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}
              </ListGroup.Item>
  
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={3}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col md={3}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x {item.price.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "EUR",
                            })} = {(item.qty * item.price).toLocaleString("it-IT", {
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
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>€{order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>€{order.taxPrice.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "EUR",
                            })}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>€{order.totalPrice.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "EUR",
                            })}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          </Row>
        </>
    )}


export default OrderScreen
