import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../Rating/Rating";
import {Link } from 'react-router-dom';

const Product = ({ product }) => {
  //set up € symbol with a space separated number by symbol
  const priceEuro = product.price.toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <Card className="my-3 p-3 rounded" style={{height:'450px'}}>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        {/*Link to id product */}
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
            <Rating 
                value={product.rating}
                text={`${product.numReviews} reviews`}
            />
        </Card.Text>
        <Card.Text as='h3'>
            {priceEuro}
         </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
