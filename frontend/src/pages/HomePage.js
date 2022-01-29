import React, {  useEffect } from "react";
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product/Product";
import Message from '../components/Message'
import Loader from "../components/Loader"
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productActions";

const HomePage = () => {
  const keyword = useParams()
  const dispatch = useDispatch();


  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword.keyword))
  }, [dispatch,keyword]);



  return (
    <>
      <h1 style={{ textTransform: "uppercase" }}>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
