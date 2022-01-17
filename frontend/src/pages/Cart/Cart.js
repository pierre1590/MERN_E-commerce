import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link,useParams,useNavigate,useSearchParams} from 'react-router-dom'
import {Row, 
    Col,
    Button,
    ListGroup,
    Image,
    Form,
    Card
} from 'react-bootstrap'
import Message from '../../components/Message'
import {addToCart , removeFromCart,clearCart} from '../../actions/cartActions'
import {FaTrash} from 'react-icons/fa'
import './Cart.css'


const Cart = () => {
    const {id} = useParams() 
    
   const [searchParams] = useSearchParams()
    const navigate = useNavigate();

    const qty = searchParams.get('qty') ? searchParams.get('qty') : 1
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart

    

    useEffect(() => {
        if(id) {
            dispatch(addToCart(id,qty))
        }   
    }, [dispatch,id,qty])

    
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/signin?redirect=shipping')
    }

    const clearCartHandler = () => {
        dispatch(clearCart())
    }


    return (
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty
              <Link to="/"> Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} thumbnail />
                    </Col>
                    <Col md={2}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>

                    <Col md={2}>
                      {item.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </Col>
                    <Col md={2}>
                      <Form.Select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Items in cart: {' '}
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                </h2>
                <h2>
                  Subtotal:{" "}
                  {cartItems
                    .reduce((acc, item) => acc + Number(item.qty) * item.price, 0)
                    .toLocaleString("it-IT", {
                      style: "currency",
                      currency: "EUR",
                    })}
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant="primary"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={2}>
          <Button
            variant="primary"
            className="btn-block reset"
            disabled={cartItems.length === 0}
            onClick={clearCartHandler}
          >
            Clear Cart
          </Button>
        </Col>
        
      </Row>
    );
}

export default Cart
