import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import  { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register() {

	const { user } = useContext(UserContext);

	// State hooks to store the values of the input field
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	
	const [isActive, setIsActive] = useState(false);

	function registerUser(e) {

			e.preventDefault();

			fetch(`${process.env.REACT_APP_API_URL}/users/register`,{

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

			if(data){


				setEmail('');
				setPassword('');
				setConfirmPassword('');
				

				Swal.fire({
				    title: 'Succeed!',
				    icon: 'success',
				    text: 'Successfully Registerd an account!'
				})

			} else {
				
				Swal.fire({
				    title: 'Error!',
				    icon: 'error',
				    text: 'Please try again!'
				})
			}

			})
		}

	useEffect(() => {
		if((email !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword)){

			setIsActive(true)

		} else {

			setIsActive(false)
		}
	},[email,password,confirmPassword])

	return (

			(user.id !== null) ?
				<Navigate to ="/"/>
			:
		<Form onSubmit= {(e) => registerUser(e)}>
		<h1 className="my-5 text-center page">Register</h1>
			<Form.Group>
				<Form.Label>Email:</Form.Label>
				<Form.Control 
				type="email" 
				placeholder="Enter Email" 
				required
				value={email}
				onChange={e => {setEmail(e.target.value)}}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control 
				type="password" 
				placeholder="Enter Password" 
				required
				value={password}
				onChange={e => {setPassword(e.target.value)}}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Confirm Password:</Form.Label>
				<Form.Control 
				type="password" 
				placeholder="Confirm Password" 
				required
				value={confirmPassword}
				onChange={e => {setConfirmPassword(e.target.value)}}
				/>
			</Form.Group>
			{
				isActive

				? <Button variant="dark" type="submit">Submit</Button>

				: <Button variant="dark" disabled>Submit</Button>

			}
		</Form>
	)
}

/*
	Important Note:
		-Whenever an event is triggered in React JS, an event object is created and can be used to retrieve information regarding the triggered event and gain access to methods that would help in development.
*/

/*
	Important Note:
		-Whenever a state of a component changes, the component rerenders the whole component executing any code found in the component. This is the reason why every individual input added to a form input prints out a console message.

		- The "e.target.value" property allows us to gain access to the input field's current value to be used when submitting form data.
*/