import React, {useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating/Rating";
import { Link,useParams, useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {listProductDetails } from '../actions/productActions'
import Loader from "../components/Loader.js";
import Message from "../components/Message.js"

const ProductDetail = () => {
  const [qty, setQty] = useState(1);

  const navigate = useNavigate()
  const {id} = useParams()

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const {loading, error , product} = productDetails

  

  useEffect(() => {
  
    dispatch(listProductDetails(id))
  
  }, [dispatch,id])

  const addToCartHandler = () => {
     navigate(`/cart/${id}?qty=${qty}`)
  }
  
  
  //set up product price in € with id of product
    const price = product.price;
    const priceFormatted = price?.toLocaleString("it-IT", {
        style: "currency",
        currency: "EUR",
    }); 

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Brand:</strong> {product.brand}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong> {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong> {priceFormatted} </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Select 
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map((i) => 
                              (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                            ) )}
                          </Form.Select>
                        </Col>
                      </Row>
                      </ListGroup.Item>
                  )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    variant="dark"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductDetail;
