import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import Swal from 'sweetalert2';

export default function EditProduct({ product, fetchData }) {

    const [productId, setProductId] = useState("");

    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState('');

    const [showEdit, setShowEdit] = useState(false);

    const editProduct = (e, productId) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
            method: 'PUT',
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

            if(data) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Product Successfully Updated'
                })
                closeEdit(); 
                fetchData(); 
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Please try again'
                })
                closeEdit();
                fetchData();
            }
        })
    }

    const openEdit = (productId) => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            
            setProductId(data._id);
            setImg(data.img);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);

        })

        setShowEdit(true);
    }

    const closeEdit = () => {
        setShowEdit(false);
        setImg('');
        setName('');
        setDescription('');
        setPrice(0);
    }

    

    return (
        <>
            <Button variant="dark" size="sm" onClick={() => openEdit(product)}>Edit</Button>
            {/* EDIT MODAL */}
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="productImg">
                            <Form.Label>Img</Form.Label>
                            <Form.Control 
                            type="text" 
                            required
                            value={img}
                            onChange={e => setImg(e.target.value)}
                            />
                        </Form.Group> 
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                            type="text" 
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                            type="number" 
                            required
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" size="sm" onClick={closeEdit} >Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
		    </Modal>
        </>
    )
}