import React, { useContext, useState, useEffect } from 'react'
import Modal from "react-bootstrap/Modal";
import { Form, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { fetchOneType,updateCategory } from "../../http/shopBase";
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';

const UpdateCategory = observer(({ IdData, show, onHide, updateList, hide }) => {
  const [category, setCategory] = useState(null)

  useEffect(() => {
    const gettingData = async () => {
      const response = await fetchOneType(IdData)
    
      const one = {...response.parametrs, ststus: 'update'}

      const updatedParametrs = response.parametrs.map((parametr) => ({
        ...parametr,
        values: parametr.values.map((value) => {return {...value, status: 'update'}}),
        status: 'update',
      }));
      
      const updatedCategory = {
        ...response,
        parametrs: updatedParametrs
      };
      setCategory(updatedCategory)
      
      
      
    }
    gettingData()
    
  }, [IdData, hide]);


  const handleNameChange = (event) => {
    setCategory((prevData) => ({ ...prevData, name: event.target.value }));
  };

  const handleAddParameter = () => {
    console.log(category)
    setCategory((prevData) => ({
      ...prevData,
      parametrs: [
        ...prevData.parametrs,
        {id: null, title: '', values: [], status: 'create' },
      ],
    }));
  };

  const handleTitleChange = (event, parameterIndex) => {
    const { value } = event.target;
    setCategory((prevData) => {
      const parametrs = [...prevData.parametrs];
      parametrs[parameterIndex].title = value;
      return { ...prevData, parametrs };
    });
  };

  const handleRemoveParameter = (parameterIndex) => {
    let parametrs = [...category.parametrs];
    const id = parametrs[parameterIndex].id
    if(id !== null)
    {
      parametrs[parameterIndex] = {id, title: null, values: [], status: 'delete'}
      
      console.log({...category, parametrs: parametrs})
      setCategory((prevData) =>  {return {...category, parametrs: parametrs}})
    }
    
    else
    {
      parametrs.splice(parameterIndex, 1);
      setCategory((prevData) => {
        return { ...prevData, parametrs };
      });
    } 
  };

  const handleAddValue = (parameterIndex) => {
    
    const newParameters = [...category.parametrs];
    newParameters[parameterIndex].values.push({id: null, discription: '', status: 'create'});
    console.log(newParameters)
    setCategory({ ...category, parametrs: newParameters });
  };

  const handleValueChange = (event, parameterIndex, valueIndex) => {
    
    const newParameters = [...category.parametrs];
    newParameters[parameterIndex].values[valueIndex].discription = event.target.value;
    setCategory({ ...category, parametrs: newParameters });
  };

  const handleRemoveValue = (parameterIndex, valueIndex) => {
    let parametrs = [...category.parametrs];
    const id = parametrs[parameterIndex].values[valueIndex].id
    console.log(id)
    if(id !== null)
    {
      parametrs[parameterIndex].values[valueIndex] = {id, discription: null, status: 'delete'}
      
      console.log({...category, parametrs: parametrs})
      setCategory((prevData) =>  {return {...prevData, parametrs: parametrs}})
    }
    else
    {
      parametrs[parameterIndex].values.splice(valueIndex, 1);
      setCategory((prevData) => {
        return { ...prevData, parametrs };
      });
    } 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(category))
    updateCategory(category).then(() => {updateList(),onHide()}).catch(e => alert(e.message))

  }




  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {category !== null ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h5 htmlFor="name" className="form-label">
                Name:
              </h5>
              <Form.Control
                id="name"
                value={category.name}
                onChange={handleNameChange}
                placeholder="Enter Type"
              />
            </div>
            <div className="mb-3">
              <h5 htmlFor="parameters" className="form-label">
                Parameters:
              </h5>
              <Button variant="outline-success" onClick={handleAddParameter}>
                Add Parameter
              </Button>
              
              {category.parametrs.map((parameter, parameterIndex) => (
                <span>
                  {parameter.status !== 'delete' ? <div
                  key={parameterIndex}
                  className="my-3 p-3 border border-secondary rounded"
                >
                  <Row className="mb-3">
                    <label
                      htmlFor={`title-${parameterIndex}`}
                      className="col-sm-2 col-form-label"
                    >
                      Title:
                    </label>
                    <div className="col-sm-10">
                      <Form.Control
                        id={`title-${parameterIndex}`}
                        type="text"
                        value={parameter.title}
                        onChange={(event) =>
                          handleTitleChange(event, parameterIndex)
                        }
                        placeholder="Enter title"
                      />
                    </div>
                  </Row>
                  <div className="mb-3">
                    <Button
                      variant="outline-danger"
                      onClick={() => handleRemoveParameter(parameterIndex)}
                    >
                      Remove Parameter
                    </Button>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <label
                        htmlFor={`values-${parameterIndex}`}
                        className="form-label me-4"
                      >
                        Values:
                      </label>
                      <Button
                        variant="outline-success"
                        type="button"
                        onClick={() => handleAddValue(parameterIndex)}
                      >
                        Add Value
                      </Button>
                    </div>
                  </div>
                  {parameter.values.map((value, valueIndex) => (
                    <div
                      key={valueIndex}
                      className="mb-3 d-flex align-items-center"
                    >
                      {value.status === 'delete' ? <></> : <>
                      <Form.Control
                        id={`value-${parameterIndex}-${valueIndex}`}
                        type="text"
                        value={value.discription}
                        onChange={(event) =>
                          handleValueChange(event, parameterIndex, valueIndex)
                        }
                        placeholder="Enter value"
                        className="me-3"
                      />
                      <Button
                        variant="outline-danger"
                        onClick={() =>
                          handleRemoveValue(parameterIndex, valueIndex)
                        }
                        className="align-self-start"
                      >
                        Remove Value
                      </Button></>}
                      <div>
                        
                      </div>
                    </div>
                  ))}
                </div> : <></>}
                </span>
                
              ))}
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2">
              <Button variant="outline-warning" type="submit">
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <></>
        )}
      </Modal.Body>
    </Modal>
  );
})

export default UpdateCategory;