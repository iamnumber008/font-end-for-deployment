import { Form, Button, Container, Row } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function Login() {

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isActive, setIsActive] = useState(false)

	function authenticate(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_API_URL}/users/login`,{

		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({

			email: email,
			password: password
		})
	})
	.then(res => res.json())
	.then(data => {

		if(typeof data.access !== "undefined"){
			
			localStorage.setItem('token', data.access);
			// The "localStorage.setItem" allows us to manipulate the browser's localStorage property to store information indefinitely to help demonstrate conditional rendering and the login and logout features.
			retrieveUserDetails(data.access)
			// Because REact JS is a single page application, using the localStorage does not trigger rerendering of components and for us to be able to view the effects of this we would need to refresh out browser.

			// Set the global user state to have properties obtained from local storage
			// Though access to the user information can be done via the localStorage this is necessary to update the user state which will help update the App component and rerender it to avoid refreshing the page upon user login and logout
			// When states change components are rerendered and the AppNavbar component will be updated based on the user credentials, unlike when using the localStorage where the localStorage does not trigger component rerendering
			setUser({
				access: localStorage.getItem('token')
			})

			Swal.fire({
				title: "Login Succesful",
				icon: "success",
				text: "Welcome to shoeGAME ()!"
			});

		} else {

			Swal.fire({
				title: "Authentication failed",
				icon: "error",
				text: "Check your login details and try again."
			});

		}
	})

	setEmail('')
	setPassword('')

	}

	const retrieveUserDetails = (token) => {
		// The token will be sent as a part of the request's header information
		// We put "Bearer" in front to the token to follow implementation standards for JWTs
		fetch(`${process.env.REACT_APP_API_URL}/users/details`,{
			headers:{
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
		})
	};

	useEffect(() => {
		if(email !== '' && password !== ''){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email,password]);



	return (
			// conditional statement that will redirect the user to the courses page when a user is logged in.
			(user.id !==null)?
		<Navigate to="/"/>
		:
		<Container fluid className="mb-5 mt-2 loginContainer">
			<Row>
				<Form className="col-md-6 mt-5 shadow" onSubmit ={(e) => authenticate(e)}>
					<h1 className="my-5 text-center page">LOGIN</h1>
					<Form.Group controlId="userEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required				
					/>
					</Form.Group>
					<Form.Group controlId="userPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					</Form.Group>
					{isActive ?
					<Button variant="dark" type="submit" id="submitBtn" className="mt-2">Submit</Button>
					:
					<Button variant="dark" type="submit" id="submitBtn" className="mt-2" disabled>Submit</Button>

					}
				</Form>
				<img className="shadow img-fluid col-md-6 picSize mt-5"src="https://i.pinimg.com/originals/62/70/cf/6270cf032f9d43dd68763ce1309cbb35.jpg"/>
			</Row>
		</Container>
	)
}