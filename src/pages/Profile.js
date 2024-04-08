import {useContext, useState, useEffect} from 'react';
import UserContext from '../UserContext';
import {Navigate} from 'react-router-dom';
import {Container, Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion';
import OrderHistory from './OrderHistory';

export default function Profile(){

	const { user } = useContext(UserContext);

	const [details, setDetails] = useState({})

	useEffect(() => {

		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(typeof data._id !== 'undefined'){
				setDetails(data);
			}
		})
	}, [])

	return (
		(user.id === null || user.isAdmin === true)?
		<Navigate to = "/products" />
		:
		<>
			<Container className="d-flex justify-content-center align-items-center my-5">
			  <Row className="my-5 shadow">
			    <Col md={6}>
			      <h1 className="page">HELLO! {details.email}</h1>
			      <h4 className="py-5">Welcome to your Profile...</h4>
			      <div className="my-3 d-flex gap-5 justify-content-start">
			      	<h6>View Your Order History</h6>
			      	<OrderHistory />
			      </div>
			      <div className="my-3 d-flex gap-5 justify-content-start">
			      	<h6>View Your Cart</h6>
			      	<Link to ="/products" target="_blank">
			      	  <motion.img
		                whileHover={{ scale: 2 }} 
		                transition={{ duration: 0.3 }} 
			      	  className="img-fluid iconSize" 
			      	  src ="https://cdn-icons-png.flaticon.com/128/2838/2838838.png"/>
			      	</Link>
			      </div>
			    </Col>
			    <Col md={6}>
			      <Link to="/products">
			        <motion.img
			          whileHover={{ opacity: 0.8, y: -20 }}
			          transition={{ duration: 0.3 }}
			          className="img-fluid"
			          src="https://a.espncdn.com/photo/2019/0119/r490904_1296x729_16-9.jpg"
			        />
			      </Link>
			    </Col>
			  </Row>
			</Container>

		</>
	)
}