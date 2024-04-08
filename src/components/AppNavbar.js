import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import React, { Fragment } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useContext } from 'react';
import UserContext from '../UserContext';

export default function AppNavbar() {
	const { user } = useContext(UserContext);

	return (
		<Navbar className= "mx-0 shadow" bg="black" expand="lg">
		  <Container fluid>
			  <Navbar.Brand className ="logo text-light" as={Link} to="/">shoeGAME ( )</Navbar.Brand>
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="ms-auto">
			      <Nav.Link className ="logo text-light" as={NavLink} to="/" exact>Home</Nav.Link>
			      <Nav.Link className ="logo text-light" as={NavLink} to="/products" exact>Products</Nav.Link>
			      {(user.id !== null) ?

			      	   user.isAdmin
			      	   ?
			      	   <>
			      	   	<Nav.Link className ="logo text-light" as={Link} to="/addProduct">Add Product</Nav.Link>
			      	   	<Nav.Link className ="logo text-light" as={Link} to="/logout">Logout</Nav.Link>
			      	   </>
			      	   :
				      <>
				      	<Nav.Link className ="logo text-light" as={NavLink} to="/profile">Profile</Nav.Link>
						<Nav.Link className ="logo text-light" as={NavLink} to="/logout" exact>Logout</Nav.Link>
					  </>
						:
					  <>
				      <Nav.Link className ="logo text-light" as={NavLink} to="/login" exact>Login</Nav.Link>
				      <Nav.Link className ="logo text-light" as={NavLink} to="/register" exact>Register</Nav.Link>
				      </>
			  	  }
			    </Nav>
			  </Navbar.Collapse>
		   </Container>
		</Navbar>
	)
}