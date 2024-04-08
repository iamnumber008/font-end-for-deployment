import {  useState, useContext } from 'react';
import UserContext from '../UserContext';
import {  Button, Modal } from 'react-bootstrap';
import {motion} from 'framer-motion';

export default function OrderHistory() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState('');

  const [showHistory, setShowHistory] = useState(false);

  console.log(user.id)

 const getOrders = (e) => {
   fetch(`${process.env.REACT_APP_API_URL}/orders/myOrders`)
     .then((res) => res.json())
     .then((data) => {
       console.log(data);
       setProducts(data.products);
       setTotal(data.totalAmount);
     })
     .catch((error) => {
       console.error("Error fetching orders:", error);
     });

   setShowHistory(true);
 };


  const close = () => {
    setShowHistory(false);
  }

  return (
    <>
      <motion.img
      whileHover={{ scale: 2 }} 
      transition={{ duration: 0.3 }} 
      className="img-fluid iconSize" 
      src ="https://cdn-icons-png.flaticon.com/128/1008/1008010.png"
      onClick = {() => getOrders()}
      />
      <Modal show={showHistory} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Order History</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
            <Button variant="dark" size="sm" onClick={close} >Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
