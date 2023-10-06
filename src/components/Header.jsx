import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar expand="lg" bg='dark' data-bs-theme='dark'>
    <Container fluid>
      <Navbar.Brand href="/">
        <img style={{maxHeight : "40px"}} src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="로고이미지" />
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Link to={"/"} className='nav-item'>Home</Link>
          <Link to={"/movies"} className='nav-item'>Movies</Link>

        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="제목 입력.."
            className="me-2"
            aria-label="Search"
            style={{background : "white"}}
          />
          <Button variant="outline-danger">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header