import React from 'react'
import './Contact.css'
import { Container,Col,Row } from 'react-bootstrap';
import {useState} from 'react';
import contactimg from '../assets/img/contact-img.svg';

export const Contact = () => {
    const formInitialDetails = {
        firstname: '',
        lastname: '',
        email: '',
        message: '',
        phone: '',
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Submit');
    const [ status, setStatus ] = useState({});
    const onFormUpdate = (category, value) => {
        setFormDetails({...formDetails, [category]: value});
    }

    const handlesubmit = async(e) => {
        e.preventDefault();
        setButtonText('Sending...');
        let response = await fetch('https://localhost:5000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(formDetails),
        });
        setButtonText('Submit');
        let result = response.json();
        setFormDetails(formInitialDetails);
        if(result.code === 200){
            setStatus({message: 'message sent succesfully', success: true});
        } else {
            setStatus({message: 'something went wrong, please try again later', success: false});
        }
    };
  return (
    <section className='contact' id='connect'>
        <Container>
            <Row className='align-items-center'>
                <Col md={6}>
                    <img src = {contactimg} alt='contact'></img>
                </Col>
                <Col md={6}>
                    <h2> Get in touch </h2>
                    <form onSubmit={handlesubmit}>
                        <Row>
                            <Col sm={6} className='px-1'>
                                <input type="text" value={formDetails.firstname} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)}></input>
                            </Col>
                            <Col sm={6} className='px-1'>
                                <input type="text" value={formDetails.lastname} placeholder="last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}></input>
                            </Col>
                            <Col sm={6} className='px-1'>
                                <input type="email" value={formDetails.email} placeholder="email" onChange={(e) => onFormUpdate('email', e.target.value)}></input>
                            </Col>
                            <Col sm={6} className='px-1'>
                                <input type="number" value={formDetails.phone} placeholder="phone" onChange={(e) => onFormUpdate('phone', e.target.value)}></input>
                            </Col>
                            <Col sm={6} className='px-1'>
                                <textarea rows='6'  value={formDetails.message} placeholder="message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                                <button type='submit' ><span>{buttonText}</span></button>
                            </Col>
                            {
                                status.message && 
                                <Col>
                                    <p className={status.success === true ? 'success' : 'error'}>{status.message}</p>
                                </Col>
                            }
                        </Row>
                    </form>
                </Col>
            </Row>
        </Container>



    </section>
  )
}
