import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col, Spinner } from "react-bootstrap";
import { Context } from "../../index"
import { updateFurniture, fetchProducers, fetchTypes, fetchOneType, fetchOneFurniture } from "../../http/shopBase";
import { observer } from "mobx-react-lite";

const UpdateFurniture = observer(({ onHide, IdData, updateList }) => {
    const { shop } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [id, setId] = useState()
    const [choiseProducer, setChoiseProducer] = useState({})
    const [categoryParams, setCategoryParams] = useState(null);
    const [categoryId, setCategoryId] = useState(0);
    const [features, setFeatures] = useState([]);
    const [file, setFile] = useState(null)


    const FeaturesParser = (arr) => {
        let res = [];
        console.log(arr);
        for (let i = arr.length - 1; i >= 0; i--) {
            res.unshift({ featureValueId: arr[i].descriptionId });
        }
        // console.log(res);
        return res;
    }

    useEffect(() => {
        fetchOneFurniture(IdData).then(data => {
            
            setFeatures(FeaturesParser(data.features))
            setId(data.id)
            setCategoryId(data.categoryId)
            setName(data.name)
            setPrice(data.price)
            setChoiseProducer(data.producer)
            fetchOneType(data.categoryId).then(data => { console.log(data), setCategoryParams(data.parametrs)})
            fetchTypes().then(data => {
                shop.setTypes(data)
                
            })
            fetchProducers().then(data => {shop.setProducers(data)})
        })
    }, [])

    const getInfoAboutCategory = (id) => {
        setCategoryId(id)
        fetchOneType(id).then(data => { setCategoryParams(data.parametrs) })
    }

    const handleFeatureChange = (index, valueId) => {
        const newFeatures = [...features];
        newFeatures[index] = { featureValueId: valueId };
        setFeatures(newFeatures);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData()
        formData.append('id', id)
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('producerId', choiseProducer.id)
        formData.append('categoryId', categoryId)
        formData.append('features', JSON.stringify(features))
        if(file !== null)
        {
            formData.append('img', file)
        }
        updateFurniture(formData).then(() => {updateList(),onHide()}).catch(e => {alert(e.message)})
    };
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    return (
        <Modal
            show={true}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update furniture
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!shop.producers ?
                    <div>
                        <Spinner animation="border" />
                    </div> :
                    <Form>
                        {/* <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle>{shop.choiseType.name || "Choise type"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {shop.types.map(type =>
                                    <Dropdown.Item
                                        onClick={() => getInfoAboutCategory(type.id)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown> */}
                        <Dropdown className="mt-2 mb-2">
                            <label className="me-3">Choose producer:</label>
                            <Dropdown.Toggle variant='secondary'>{choiseProducer.name}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {shop.producers.map(producer =>
                                    <Dropdown.Item
                                        onClick={() => setChoiseProducer(producer)}
                                        key={producer.id}
                                    >
                                        {producer.name}
                                    </Dropdown.Item>
                                )}
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
                <Form.Label>Enter Category</Form.Label>
            ) : (
                categoryParams.map((category, index) => (
                    <div key={category.id} className="mb-3">
                        <Form.Label>{category.title}:</Form.Label>
                        <Form.Select onChange={(e) => handleFeatureChange(index, parseInt(e.target.value))} defaultValue={features[index].featureValueId}>
                            <option key={0} value={0}>None</option>
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

export default UpdateFurniture;