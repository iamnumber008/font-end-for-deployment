import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'; 

export default function ArchiveProduct({product, isActive, fetchData}) {

	const archiveToggle = (e, productId) => {

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data) {
				Swal.fire({
				    title: 'Succeed!',
				    icon: 'success',
				    text: 'Product Successfully Archived'
				})
				fetchData();
			} else {
				Swal.fire({
				    title: 'Error!',
				    icon: 'error',
				    text: 'Try Again!'
				})
				fetchData();
			}
		})
	}

	const activateToggle = (e, productId) => {

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data){
				Swal.fire({
				    title: 'Succeed!',
				    icon: 'success',
				    text: 'Product Successfully Activated'
				})
				fetchData();
			} else {
				Swal.fire({
	                title: 'Error!',
	                icon: 'error',
	                text: 'Try Again!'
	            })
	            fetchData();
			}
		})
	}

	return (
		<>
			{isActive === true?(
				<Button variant ="dark" size="sm" onClick={e => archiveToggle(e, product)}>
				Archive
				</Button>
				):(
				<Button variant ="dark" size="sm" onClick={e => activateToggle(e, product)}>
				Activate
				</Button>
			)}
		</>
	)
}