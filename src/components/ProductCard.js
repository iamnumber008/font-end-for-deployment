import { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';

export default function ProductCard({ productProp }) {
  const { _id, img, name, description, price } = productProp;

  const [isOpen, setIsOpen] = useState("");

  console.log(useState(0));

  return (
      <Container>
        <Row>
          <Col xs={12} className="mb-4 text-center bannerContainer">
            <motion.div
            whileHover={{ y: -20 }}
            transition={{ duration: 0.3 }} 
            // transition = {{layout : {type: "spring"}}}
            layout 
            onClick = {() => setIsOpen(!isOpen) }
            className="card bannerContainer p-5 text-center shadow"
            >
            	<motion.div layout="position" className="page">
            		<Card.Img src ={img} className="img-fluid"/>
            		<motion.div className="page">{name}</motion.div>
            		<p>Click to View Details</p>	
            	</motion.div>
            	
            	{isOpen && (
            	<motion.div
            	initial={{opacity: 0}}
            	animate={{opacity: 1}}
            	transition = {{duration: 1}}
            	>
            		<p >{description}</p>
            		<p >PhP {price}</p>
            		<Link className = "btn btn-dark" to={`/products/${_id}`}>Details</Link>
            	</motion.div>
            	)}
            </motion.div>
          </Col>
        </Row>
      </Container>
    );
  }

ProductCard.propTypes = {
  productProp: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
