import Banner from '../components/Banner';
// import Highlights from '../components/Highlights';
// import FeaturedCourses from '../components/FeaturedCourses';
import {Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

export default function Home() {

  const data = {
      title: "shoeGAME ( )",
      content: "SHOES .  FOR .  EVERYONE.",
      destination: "/products",
      label: "SHOP"
  }

  return (
    <>
      <Banner data={data}/>
      <Container className="my-5">
        <Row>
          <Col md ={6}>
            <Link to="/products">
              <motion.img
              whileHover={{ opacity: 0.7, y:-10 }}
              transition={{ duration: 0.3 }} 
              className="img-fluid rounded" 
              src="https://wallpapercave.com/wp/wp5069418.jpg"/>
            </Link>
          </Col>
          <Col md ={6} className="text-center">
            <div>
              <h1 className="page">Contact Us</h1>
            </div>
            <div className="mt-5 d-flex gap-5 justify-content-center">
              <Link to ="http://facebook.com" target="_blank">
                <motion.img
                whileHover={{ scale: 2 }} 
                transition={{ duration: 0.3 }}
                className="img-fluid iconSize" 
                src ="https://cdn-icons-png.flaticon.com/128/1051/1051309.png"
                />
              </Link>
              <Link to ="http://instagram.com" target="_blank">
                <motion.img
                whileHover={{ scale: 2 }} 
                transition={{ duration: 0.3 }} 
                className="img-fluid iconSize" 
                src ="https://cdn-icons-png.flaticon.com/128/1400/1400829.png"/>
              </Link> 
              <Link to ="http://tiktok.com" target="_blank">
                <motion.img
                whileHover={{ scale: 2 }} 
                transition={{ duration: 0.3 }}
                className="img-fluid iconSize" 
                src ="https://cdn-icons-png.flaticon.com/128/3116/3116491.png"/>
              </Link>
            </div>
            <div className="bg-dark mt-5">
              <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125625.9993862758!2d123.6956121249896!3d10.276688068385798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a977e4598c638d%3A0xd2016057b1f9cd28!2sMinglanilla%2C%20Cebu!5e0!3m2!1sen!2sph!4v1697076895513!5m2!1sen!2sph"
                    width="400"
                    height="300"
                    style={{ border: '0' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
            </div>
            <Link to= "https://www.youtube.com/watch?v=I33o9UnUe1A" target="_blank">
            <motion.h1 
            whileHover={{rotate: -45, y:20}}
            transition={{duration: 0.3}}
            className='greatest mt-5'>
              GREATEST GAME OF ALL TIME.
            </motion.h1>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}
