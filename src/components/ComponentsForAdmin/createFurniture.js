import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col, Spinner,SplitButton } from "react-bootstrap";
import { Context } from "../../index"
import { createFurniture, fetchProducers, fetchTypes, fetchOneType } from "../../http/shopBase";
import { observer } from "mobx-react-lite";

const CreateFurniture = observer(({ show, onHide, updateList }) => {
    const { shop } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [choiseProducer, setChoiseProducer] = useState({})
    const [choiseCategory, setChoiseCategory] = useState({})
    const [categoryParams, setCategoryParams] = useState(null);
    const [features, setFeatures] = useState([]);
    const [file, setFile] = useState(null)

    useEffect(() => {
        fetchTypes().then(data => {
            shop.setTypes(data)
        })
        fetchProducers().then(data => shop.setProducers(data))
    }, [])
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const getInfoAboutCategory = (category) => {
        setChoiseCategory(category)
        fetchOneType(category.id).then(data => { setCategoryParams(data.parametrs)})
    }

    const handleFeatureChange = (index, valueId) => {
        const newFeatures = [...features];
        newFeatures[index] = { featureValueId: valueId };
        setFeatures(newFeatures);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('producerId', choiseProducer.id)
        formData.append('categoryId', choiseCategory.id)
        formData.append('features', JSON.stringify(features))
        createFurniture(formData).then(() => { onHide(), updateList()
            // setName('')
            // setPrice(0)
            // setChoiseProducer({})
            // setChoiseCategory({})
            // setCategoryParams(null);
            // useState([]);
            // useState(null)
        }).catch(e => {alert(e.message)})

    };

    return (
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create new furniture
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!shop.producers ?
                    <div>
                        <Spinner animation="border" />
                    </div> :
                    <Form>
                        <Dropdown className="mt-2 mb-2">
                            <label className="me-3">Choose category:</label>
                            <Dropdown.Toggle variant={"secondary"}>{choiseCategory.name || "Choise type"}</Dropdown.Toggle>
                            <Dropdown.Menu >
                                {shop.types.map(type =>
                                    <Dropdown.Item
                                        onClick={() => getInfoAboutCategory(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <label className="me-3">Choose producer:</label>
                            <Dropdown.Toggle variant={"secondary"}>{choiseProducer.name || "Choose producer"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {shop.producers.map((producer) => (
                                    <Dropdown.Item key={producer.id} onClick={() => setChoiseProducer(producer)}>
                                        {producer.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-3"
                            placeholder="Enter name"

                        />
                        <Form.Control
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            className="mt-3"
                            placeholder="Enter price"
                            type="number"

                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Select file"
                            type="file"
                            onChange={selectFile}
                        />
                        <hr />
                        {categoryParams == null ? (
                            <label>Enter Category</label>
                        ) : (
                            categoryParams.map((category, index) => (
                                <div key={category.id} className="mb-3">
                                    <Form.Label>{category.title}:</Form.Label>
                                    <Form.Select onChange={(e) => handleFeatureChange(index, parseInt(e.target.value))}>
                                        <option value={0}>None</option>
                                        {category.values.map((value) => (
                                            <option key={value.id} value={value.id}>
                                                {value.discription}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                            ))
                        )}
                    </Form>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={handleSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
});

export default CreateFurniture;