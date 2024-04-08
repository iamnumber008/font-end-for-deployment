import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Container, Row, Col } from 'react-bootstrap';

export default function ProductView({ productsData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsArr = productsData
      .filter(product => product.isActive === true)
      .map(product => (
        <Col key={product._id} xs={12} md={4} className="mb-4">
          <ProductCard productProp={product} />
        </Col>
      ));

    setProducts(productsArr);
  }, [productsData]);

  return (
    <>
      <h1 className="text-center page my-3"> PRODUCTS </h1>
      <Container>
        <Row>{products}</Row>
      </Container>
    </>
  );
}
