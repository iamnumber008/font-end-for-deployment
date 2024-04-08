import { useState, useEffect, useContext } from 'react';
import { Container, Button, Row, Col, Card, Form } from 'react-bootstrap';

import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function ProductView(){

	const { user } = useContext(UserContext);

	const navigate = useNavigate();

	const { productId } = useParams();

	const [img, setImg] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [prodId, setProdId] = useState("");

	const order = (e) => {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/orders/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				userId: user.id,
				products: [ {productId: prodId,
				quantity: quantity} ]
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data === true){
				Swal.fire({
					title: 'Ordered Succesfully!',
					icon:'success',
					text: 'You have successfully ordered this product.'
				})
			} else {
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error',
					text: 'Please try again.'
				})
			}
		})
	}

	useEffect(() => {
		console.log(productId);

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setProdId(data._id);
			setImg(data.img);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
	}, [productId]);

	return (
	
		<Container className="mt-5">
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Card className="mb-5 shadow">
						<Card.Body className="text-center">
							<Card.Img src ={img} className="img-fluid"/>
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description:</Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>PhP {price}</Card.Text>
							{ user.id !== null ? 
							<>
									<Form.Group className="px-5 my-2 text-center" controlId="productQuantity">
			                            <Form.Label>Quantity</Form.Label>
			                            <Form.Control 
	                                    type="number" 
	                                    required
	                                    value={quantity}
	                                    onChange={e => setQuantity(e.target.value)}
	                                    />
			                        </Form.Group>
			                        { quantity > 0?
			                        	<Button variant="dark" block onClick={(e) => order(e)}>Order</Button>
			                        	:
			                        	<Button variant="dark" block onClick={(e) => order(e)} disabled>Order</Button>
			                        }
									
							</>
								: 
									<Link className="btn btn-danger btn-block" to="/login">Log in to Order</Link>
							}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>


	)
}