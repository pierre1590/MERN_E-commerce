import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'
import { saveShippingAddress } from '../../actions/cartActions'

const ShippingScreen = () => {

  const dispatch = useDispatch();

  const navigate  = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address );
  const [city, setCity] = useState(shippingAddress.city );
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [province, setProvince] = useState(shippingAddress.province)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country,province }))
    navigate('/payment')
    
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label htmlFor='address'>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label htmlFor='city'>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label htmlFor='postalCode'>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='province'>
          <Form.Label htmlFor='province'>Province</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter province'
            value={province}
            required
            onChange={(e) => setProvince(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label htmlFor='country'>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Link to='/cart'>
            <Button variant='primary' type='submit'>
                Back
            </Button>
        </Link>
        <Button type='submit' variant='primary' disabled={!address && !country}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen