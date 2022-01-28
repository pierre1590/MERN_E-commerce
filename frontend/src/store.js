import {
  createStore,
  combineReducers,
  applyMiddleware}  from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
} from './reducers/productReducer'
import {cartReducer} from './reducers/cartReducer'
import {
  userLoginReducer,
  userRegisterReducer, 
  userDetailsReducer, 
  userDeleteReducer, 
  userUpdateProfileReducer,
  userListReducer,
  userAdminDeleteReducer,
  userUpdateReducer,
 } from './reducers/userReducer'
import {
  orderCreateReducer, 
  orderDetailsReducer, 
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer
} from './reducers/orderReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userDelete: userDeleteReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    userList: userListReducer,
    userAdminDelete: userAdminDeleteReducer,
    userUpdate: userUpdateReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

  const initialState = {
    cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
  }
const middleware = [thunk]

const store = createStore(reducer, initialState,composeWithDevTools
    (applyMiddleware(...middleware))
)

    export default store
