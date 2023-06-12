import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import IMG from "../components/IMGcomponents/TsetProduct.jpg"
import { fetchAllBasket, fetchTypes, updateBasket } from '../http/shopBase';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';


const API = 'http://localhost:5000/'

const ChoiseCategory = () => {
    const { user } = useContext(Context)
    const { shop } = useContext(Context)
    const [categiries, setCategiries] = useState();
    const navigate = useNavigate()


    useEffect(() => {
        fetchTypes().then(data => {
            setCategiries(data)
        }).catch(e => alert(e.message))
    }, [])


    return (

        <Container style={{ marginTop: '20px' }}>
            {categiries == null ?
                <div>
                    <Spinner animation="border" />
                </div> :
                <div className="category-tiles">
                    {categiries.map(one => (
                        <div href="#" className="tile" onClick={() => { navigate('/shop'), shop.setCategory(one) }} key={one.id}>
                            <img src="https://cdn-icons-png.flaticon.com/512/2361/2361624.png" alt="Sofa" />
                            <h1><Badge bg="dark">{one.name}</Badge></h1>
                        </div>
                    ))}
                </div>}
        </Container>

    )
}

export default ChoiseCategory