import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { fetchAllBasket, updateOrder,  deleteOrder} from '../http/shopBase';
import { Context } from '../index';
import {} from '../'

const API = process.env.REACT_APP_API_URL

const Basket = () => {
    const { user } = useContext(Context)
    const [data, setData] = useState(null);

    useEffect(() => {s
        fetchAllBasket(user.getUser().id).then(data => {
            setData(data)
            console.log(data)
        }).catch(e => alert(e.message))

    }, [])

    const updateOrderFunc = (basket) => {
        updateOrder(user.getUser().id, basket).then(data => {
            console.log(data)
        setData(data)
        }).catch(e => alert(e.message))
    }

    const deleteOrderFunc = (basket) => {
        deleteOrder(user.getUser().id, basket.id).then(data => {
            console.log(data)
        setData(data)
        }).catch(e => alert(e.message))
    }

    const dataPasrser = (date) => {
        const originalDate = new Date(date);
        const year = originalDate.getFullYear();
        const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
        const day = ('0' + originalDate.getDate()).slice(-2);
        const hours = ('0' + originalDate.getHours()).slice(-2);
        const formattedDate = `${year}-${month}-${day} ${hours}:00`;
        return formattedDate
    }

    return (
        <Container style={{ marginTop: '20px' }}>
            {data === null ?
                <div>
                    <Spinner animation="border" />
                </div> :
                <Form aria-label="Default select example">
                    <h1 style={{ display: 'flex', justifyContent: 'center' }}>Create order</h1>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Img</th>
                            </tr>
                        </thead>
                        <tbody className="justify-content-center" >
                            {data.basket.map((data, el) =>
                                <tr key={data.id}>
                                    <td >{data.id}</td>
                                    <td>{data.furniture.name}</td>
                                    <td>₴{data.furniture.price}</td>
                                    <td>{dataPasrser(data.createdAt)}</td>
                                    <td ><Image style={{ width: '150px' }} src={API + data.furniture.img} /></td>
                                    {data.status === "IN BASKET" ? <td> <Button variant="danger" onClick={() => deleteOrderFunc(data)}>Delete</Button></td> : <div></div>}
                                    {data.status === "IN BASKET" ? <td><Button variant="outline-success" onClick={() => updateOrderFunc(data)}>Create new order</Button></td> : <td><div color="red">Proccesing</div></td>}
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <h1 style={{ display: 'flex', justifyContent: 'center' }}>History</h1>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Img</th>
                            </tr>
                        </thead>
                        <tbody className="justify-content-center" >
                            {data.history.map((data, el) =>
                                <tr key={data.id}>
                                    <td >{data.id}</td>
                                    <td>{data.furniture.name}</td>
                                    <td>₴{data.furniture.price}</td>
                                    <td>{dataPasrser(data.createdAt)}</td>
                                    <td ><Image style={{ width: '150px' }} src={API + data.furniture.img} /></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Form>}
        </Container>

    )
}

export default Basket