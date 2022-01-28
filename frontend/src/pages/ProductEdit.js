import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { FaArrowLeft } from "react-icons/fa";

const ProductEdit = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <FormContainer>
        <Link to="/admin/productlist" className="btn btn-light my-3">
          <FaArrowLeft /> Go Back
        </Link>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
                              <Form.Group controlId="name">
                                  <Form.Label>Product name:</Form.Label>
                                  <Form.Control
                                      type="text"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      placeholder="Enter product name" />
                              </Form.Group>

                              <Form.Group controlId="price">
                                  <Form.Label>Price:</Form.Label>
                                  <Form.Control
                                      type="number"
                                      value={price}
                                      onChange={(e) => setPrice(e.target.value)}
                                      placeholder="Enter price" />
                              </Form.Group>

                              <Form.Group controlId="image">
                              <Form.Label>Image</Form.Label>
                              <Form.Control
                                  type="text"
                                  placeholder="Enter image url"
                                  value={image}
                                  onChange={(e) => setImage(e.target.value)} 
                                />
                                <Form.Control 
                                    type="file"
                                    id='image-file'
                                    label='Choose file'
                                    onChange={uploadFileHandler}
                                    accept="image/*"
                                    
                                />
                              {uploading && <Loader />}
                          </Form.Group>

                          <Form.Group controlId="brand">
                                  <Form.Label>Brand:</Form.Label>
                                  <Form.Control
                                      type="text"
                                      value={brand}
                                      onChange={(e) => setBrand(e.target.value)}
                                      placeholder="Enter brand" />
                              </Form.Group>
                              
                              <Form.Group controlId="category">
                                  <Form.Label>Category:</Form.Label>
                                  <Form.Control
                                      type="text"
                                      value={category}
                                      onChange={(e) => setCategory(e.target.value)}
                                      placeholder="Enter category" />
                              </Form.Group>
                              
                              <Form.Group controlId="countInStock">
                                  <Form.Label>Count in stock:</Form.Label>
                                  <Form.Control
                                      type="number"
                                      value={countInStock}
                                      onChange={(e) => setCountInStock(e.target.value)}
                                      placeholder="Enter count in stock" />
                              </Form.Group>
                              
                              <Form.Group controlId="description">
                                  <Form.Label>Description:</Form.Label>
                                  <Form.Control
                                      type="text"
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}
                                      placeholder="Enter description" />
                              </Form.Group>
                              
                              <Button type="submit" variant="primary">
                                  Update
                              </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEdit;
