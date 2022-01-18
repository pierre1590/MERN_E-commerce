import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import{Form,Button,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps.js'
import {savePaymentMethod} from '../../actions/cartActions'
import './ShippingScreen.css'


 const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const navigate = useNavigate();

    if(!shippingAddress){
        navigate('/shipping')
    }


    const [payment, setPaymentMethod] = useState('PayPal');
    
    const dispatch = useDispatch()


    const submitHandler = (e) => {
      dispatch(savePaymentMethod(paymentMethod))
      navigate('/placeorder')
    };



    return (
      <FormContainer>
        <CheckoutSteps step1 step2 step3  />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="payment">
                <Form.Label as='legend'>Select Method</Form.Label>
            </Form.Group>
            <Col>
                <Form.Check 
                    type='radio' 
                    label='Paypal or Credit Card' 
                    id='PayPal'
                    name='paymentMethod' 
                    value='PayPal' 
                    checked 
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                </Form.Check>
                <Form.Check
                    type='radio'
                    label='Stripe'
                    id='Stripe'
                    name='paymentMethod'
                    value='Stripe'
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                </Form.Check>
            </Col>
            <Button variant="primary" type="submit">
                Continue
            </Button>
        </Form>
      </FormContainer>
    );
}

export default PaymentScreen;