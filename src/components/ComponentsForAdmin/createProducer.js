import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import { createProducer } from '../../http/shopBase';
import { observer } from 'mobx-react';
import { Context } from '../../index';
// import {createBrand, createType} from "../../http/deviceAPI";

const CreateBrand = observer(({show, onHide}) => {
    const [value, setValue] = useState('')
    const {shop} = useContext(Context)

    const addProducer = () => {
        createProducer({name: value}).then(data => {
            console.log(data, "this s")
            setValue('')
            onHide()
            shop.setProducers([...shop.producers, data])
        }).catch(e => alert(e.message))
    }

    return (
        <Modal
        show={show}
        onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create new furniture
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Control
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Enter Producer"}
            />
             </Modal.Body>
             <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addProducer}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateBrand;