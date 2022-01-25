import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Container } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart/Cart';
import UserProfile from './pages/UserProfile';
import CookieAgree from './components/CookieAgree/CookieAgree';
import  ShippingScreen  from "./pages/ShippingScreen/ShippingScreen.js";
import Payment from "./pages/PaymentScreen.js";
import Order from "./pages/PlaceOrder.js";
import OrderScreen from './pages/OrderScreen.js';
import UsersScreenList from './pages/UsersScreenList.js';
import UserEdit from './pages/UserEdit.js'


const App = () => {
  return (
    <Router> 
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
              <Route path='/' element={<HomePage />}  exact/>
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/cart/:id' element={<Cart/>} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<SignUp />} /> 
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/shipping' element={<ShippingScreen />} />      
              <Route path='/payment' element={<Payment/>} />
              <Route path='/placeorder' element={<Order />} />
              <Route path='/order/:id' element={<OrderScreen />} /> 
              <Route path='/admin/userlist' element={<UsersScreenList />} />
              <Route path='/admin/user/:id/edit' element={<UserEdit />} />
          </Routes> 
           <CookieAgree />  
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
