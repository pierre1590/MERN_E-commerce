import React from "react";
import './Header.css'
import {Route} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import {logout} from '../../actions/userActions'
import SearchBox from '../SearchBox'


const Header = () => {
    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin


    const logoutHandler = () => {
      dispatch(logout())
    }


  return (
    <header>
      <Navbar
        style={{background:'linear-gradient(90deg, blue, lightcoral )',textTransform:'uppercase',fontSize:'18px'}}
        expand="xl" 
        variant="dark"
       className="navbar"
        collapseOnSelect
      >
        <Container fluid >
          <LinkContainer to="/">
            <Navbar.Brand >Shop</Navbar.Brand>
          </LinkContainer> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox style={{display:'inline'}} className="searchbox"/>
            <Nav className="ms-auto" style={{ marginRight: "10%" }}>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart />
                  {cartItems.length > 0 ? (
                    <div className="cart-icon">
                      <span>
                        {cartItems.reduce(
                          (acc, item) => acc + Number(item.qty),
                          0
                        )}
                      </span>
                    </div>
                  ) : (
                    <span></span>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login" style={{textTransform: "uppercase" }}>
                  <Nav.Link>
                    <FaUser />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
