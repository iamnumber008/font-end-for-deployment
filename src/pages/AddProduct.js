import {useState,useEffect, useContext} from 'react';
import {Form,Button} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct(){

	const navigate = useNavigate();

	const { user } = useContext(UserContext);

	const [img, setImg] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if(img !== '' && name !== '' && description !== '' && price !== '') {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [name, description, price]);

	function createProduct(e){
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/`, {

			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({

				img: img,
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data){
				Swal.fire({

					icon:"success",
					title: "Product Added"

				})

				navigate('/products')
			} else {
				Swal.fire({

					icon:"error",
					title: "Unsuccessful",
					text: data.message

				})
			}
		})

		setImg('');
		setName('');
		setPrice('');
		setDescription('');

	}

	return(

		(user.isAdmin === true) ?

		<>
			<h1 className="my-5 text-center page">Add Product</h1>
			<Form onSubmit={e => createProduct(e)}>
				<Form.Group>
				    <Form.Label>Image Link:</Form.Label>
				    <Form.Control type="text" placeholder="Enter Link" required value={img} onChange={e => {setImg(e.target.value)}}/>
				</Form.Group>
			    <Form.Group>
			        <Form.Label>Name:</Form.Label>
			        <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
			    </Form.Group>
			    <Form.Group>
			        <Form.Label>Description:</Form.Label>
			        <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
			    </Form.Group>
			    <Form.Group>
			        <Form.Label>Price:</Form.Label>
			        <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
			    </Form.Group>
			    {
			    	isActive

			    	? <Button variant="dark" type="submit">Submit</Button>

			    	: <Button variant="dark" disabled>Submit</Button>

			    }
			</Form>
		</>
		:
		<Navigate to="/products"/>

	)
}