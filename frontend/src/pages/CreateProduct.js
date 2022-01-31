import React, {useState, useEffect} from 'react';
import {Form,Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer'
import {useNavigate,Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { createProduct } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader/Loader';
import {FaArrowLeft} from 'react-icons/fa';
import axios from 'axios'

export const CreateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [countInStock, setCountInStock] = useState("")
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

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
        dispatch(createProduct(
           name,
           price,
           description,
           image,
           category, 
           brand, 
           countInStock
           ))
    }

    useEffect(() => {
        if (successCreate) {
            navigate('/admin/productlist')
        }
    }, [successCreate, createdProduct,navigate])

  return (
    <>
      <FormContainer>
      <Link className="btn btn-light my-3" to="/admin/productlist">
        <FaArrowLeft/>
        Go to Product List
      </Link>
        <h1>New Product</h1>
       
         {loadingCreate && <Loader />}
         {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Product name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

            <Form.Group controlId="countInStock">
                <Form.Label>Stock:</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                />
            </Form.Group>

            {/*Upload image product */}
            <Form.Group controlId="image">
                <Form.Label>Image:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter image url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <Form.Control 
                    type='file'
                    onChange={uploadFileHandler}
                    label='Choose file'
                    accept="image/*"
                    id='image-file'
                />
            </Form.Group>


          <Button variant="success" type="submit">
            Create Product
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};


export default CreateProduct;