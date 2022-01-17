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
          </Routes> 
          <CookieAgree /> 
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
