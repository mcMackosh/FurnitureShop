import React, { useContext, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Form, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { createType } from "../../http/shopBase";
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';

const CreateType = observer(({ show, onHide, updateList }) => {
    const [name, setName] = useState("");
    const [parameters, setParameters] = useState([]);
    const { shop } = useContext(Context)

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleTitleChange = (event, index) => {
        const newParameters = [...parameters];
        newParameters[index] = {
            ...newParameters[index],
            title: event.target.value,
        };
        setParameters(newParameters);
    };

    const handleAddParameter = () => {
        setParameters([...parameters, { title: "", values: [] }]);
    };

    const handleRemoveParameter = (index) => {
        const newParameters = [...parameters];
        newParameters.splice(index, 1);
        setParameters(newParameters);
    };

    const handleValueChange = (event, parameterIndex, valueIndex) => {
        const newParameters = [...parameters];
        newParameters[parameterIndex].values[valueIndex] = event.target.value;
        setParameters(newParameters);
    };

    const handleAddValue = (parameterIndex) => {
        const newParameters = [...parameters];
        newParameters[parameterIndex].values.push("");
        setParameters(newParameters);
    };

    const handleRemoveValue = (parameterIndex, valueIndex) => {
        const newParameters = [...parameters];
        newParameters[parameterIndex].values.splice(valueIndex, 1);
        setParameters(newParameters);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = {
            name,
            parameters,
        };
        createType(result).then(() => {
            setName("");
            setParameters([]);
            onHide()
            updateList()
        }).catch(e => alert(e.message))

    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create new furniture
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <h5 htmlFor="name" className="form-label">Name:</h5>
                        <Form.Control
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Enter Type"
                        />
                    </div>
                    <div className="mb-3">
                        <h5 htmlFor="parameters" className="form-label">Parameters:</h5>
                        <Button variant="outline-success" onClick={handleAddParameter}>
                            Add Parameter
                        </Button>
                        {parameters.map((parameter, parameterIndex) => (
                            <div key={parameterIndex} className="my-3 p-3 border border-secondary rounded">
                                <Row className="mb-3">
                                    <label htmlFor={`title-${parameterIndex}`} className="col-sm-2 col-form-label">Title:</label>
                                    <div className="col-sm-10">
                                        <Form.Control
                                            id={`title-${parameterIndex}`}
                                            type="text"
                                            value={parameter.title}
                                            onChange={(event) => handleTitleChange(event, parameterIndex)}
                                            placeholder="Enter title"
                                        />
                                    </div>
                                </Row>
                                <div className="mb-3">
                                    <Button variant="outline-danger" onClick={() => handleRemoveParameter(parameterIndex)}>
                                        Remove Parameter
                                    </Button>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center mb-2">
                                        <label htmlFor={`values-${parameterIndex}`} className="form-label me-4">Values:</label>
                                        <Button variant="outline-success" type="button" onClick={() => handleAddValue(parameterIndex)}>
                                            Add Value
                                        </Button>
                                    </div>
                                </div>
                                {parameter.values.map((value, valueIndex) => (
                                    <div key={valueIndex} className="mb-3 d-flex align-items-center">
                                        <Form.Control
                                            id={`value-${parameterIndex}-${valueIndex}`}
                                            type="text"
                                            value={value}
                                            onChange={(event) => handleValueChange(event, parameterIndex, valueIndex)}
                                            placeholder="Enter value"
                                            className="me-3"
                                        />
                                        <Button
                                            variant="outline-danger"
                                            onClick={() => handleRemoveValue(parameterIndex, valueIndex)}
                                            className="align-self-start"
                                        >
                                            Remove Value
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <Button variant="outline-warning" type="submit">Submit</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
})

export default CreateType;
