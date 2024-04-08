import { Row, Col, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React from 'react';
import {motion} from 'framer-motion';
import {useState} from 'react';

export default function Banner({data}) {

	const { title, content, destination, label } = data;

	const [isOpen, setIsOpen] = useState(false);

	return (
				<motion.div 
				transition = {{layout : {type: "spring"}}}
				layout 
				onClick = {() => setIsOpen(!isOpen) }
				className="mt-5 card bannerContainer p-5 text-center shadow"
				>
					<motion.h1 layout="position" className="logo">{title}</motion.h1>
					<motion.h1 layout="position" className="page">↕</motion.h1>
					{isOpen && (
					<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition = {{duration: 1}}
					>
						<p className="page">{content}</p>
						<Link className = "btn btn-dark" to={destination}>{label}</Link>
					</motion.div>
					)}
				</motion.div>
	)
}