import React, { useContext,useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import imgS from '../IMGcomponents/TsetProduct.jpg'
import { observer } from 'mobx-react';
import { Context } from '../../index';
import { deleteProducer, fetchProducers } from '../../http/shopBase';
import CreateProducer from './createProducer'


const ProducerD = observer(() => {

    const{shop} = useContext(Context)
    
    const del = (id) =>
    {
        deleteProducer(id).then(data => {console.log(data, 'delete')}).catch(e => alert(e.message))
        shop.setProducers(shop.producers.filter(data => data.id !== id))
    }

    useEffect(()=>
    {
        fetchProducers().then(data => shop.setProducers(data)).catch(e => alert(e.message))
    },[])
    const [producerVisible, setProducerVisible] = useState(false)
    

    return (
        <Container style={{ marginTop: '20px' }}>
            <Button variant="outline-success" className="me-2" onClick={() => setProducerVisible(true)}>Create new producer</Button>
            <Form aria-label="Default select example">
            {!shop.producers ?
                <div>
                    <Spinner animation="border" />
                </div> :
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="justify-content-center" >
                        {shop.producers.map(producer =>
                            <tr key={producer.id}>
                                <td >{producer.id}</td>
                                <td >{producer.name}</td>
                               
                                <td><Button variant="outline-danger" onClick={() => del(producer.id)}>Delete</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>}
                <CreateProducer  show={producerVisible} onHide={() => setProducerVisible(false)}/>
            </Form>
        </Container>
    );
})

export default ProducerD;