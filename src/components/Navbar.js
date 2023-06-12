import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useNavigate } from 'react-router-dom';
import { Context } from '../index';

const NavBar = observer(() => {
  const history = useNavigate()
  const {user} = useContext(Context)

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('token')
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/choise-type">FurnitureShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <div className="me-2">-</div>
            <Form className="d-flex">
              {/* <Form.Control
                type="search"
                placeholder="Знайти"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="dark">Знайти</Button> */}
            </Form>
          </Nav>
          <Nav style={{marginTop: '15px'}}>
            {!user._isAuth ? 
            <Button variant='dark' onClick={() => history('/registration')}>Registration</Button> :
            <div><Button variant='dark' onClick={() => history('/basket')}>Basket</Button>
            <Button variant = 'dark' onClick={() => logOut()}>Logout</Button>  
            {user._user.role === 'ADMIN' ? <Button variant='dark' onClick={() => history('/admin')}>Admin</Button>:<></>}
            <span style={{color: 'white', marginTop: '7px', marginLeft: '10px'}}>Username: {user.getUser().login}</span>
            </div>} 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
)

export default NavBar