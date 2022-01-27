import React, {useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Table, Button, Row, Col,Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { 
  listProducts, 
  deleteProduct,
} from "../actions/productActions";
import {PRODUCT_CREATE_RESET} from '../constants/productConstants';
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";



const ProductList = () => {
  const [show, setShow] = useState(false)

  const handleClose = (state) => setShow(false)
  const handleShow = (state) => setShow(true)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

 
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET})

    if (!userInfo.isAdmin) {
     navigate('/login')
    } 

    dispatch(listProducts());

  }, [
    dispatch, 
    navigate, 
    userInfo,
    successDelete
  ]);

  const deleteHandler = (id) => {
      dispatch(deleteProduct(id));
      handleClose();
      window.location.reload();
  };

  const createProductHandler = () => {
    navigate('/admin/product/new')
  };

  
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-center'>
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm text-center'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <><tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}€</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={handleShow}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr><Modal 
                        show={show} 
                        onHide={handleClose}
                        size='lg'
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Are you sure you want to delete this product?</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant="danger" onClick={() => deleteHandler(product._id)}>
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal></>
              ))}
            </tbody>
          </Table>    
        </>
      )}
    </>
  )
}
export default ProductList;
