import React,{useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { deleteTypes, fetchTypes } from '../../http/shopBase';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import CreateCategory from './createCategory'
import UpdateCategory from './updateCategory'

const CategoryList = observer(() => {

    const{shop} = useContext(Context)
    const id = React.useRef(null)
    const [createPanelVisible, setCreatePanelVisible] = useState(false)
    const [updatePanelVisible, setUpdatePanelVisible] = useState(false)

    const updateList = () =>
    {
        fetchTypes().then(data => shop.setTypes(data)).catch(e => alert(e.message))
    }

    const del = (id) =>
    {
        deleteTypes(id).then(() => updateList())
        
    }

    useEffect(()=>
    {
        fetchTypes().then(data => shop.setTypes(data)).catch(e => alert(e.message))
    },[])

   

    const setCategoryId = (Dataid) => 
    {
        id.current = Dataid
    }

    return (
        <Container style={{ marginTop: '20px' }}>
            {!shop.types ?
                <div>
                    <Spinner animation="border" />
                </div> :
                <div>
                    <Form aria-label="Default select example">
                    <Button variant="outline-success" className="me-2" onClick={() => setCreatePanelVisible(true)}>Create new category</Button>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody className="justify-content-center" >
                                {shop.types.map(type =>
                                    <tr key={type.id}>
                                        <td >{type.id}</td>
                                        <td >{type.name}</td>
                                        <td><Button variant="outline-warning" onClick={() =>  { setCategoryId(type.id), setUpdatePanelVisible((visible) => !visible)}}>Update</Button></td>
                                        <td><Button variant="outline-danger" onClick={() => del(type.id)}>Delete</Button></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <CreateCategory IdData={null} show={createPanelVisible} onHide={() => setCreatePanelVisible(false)} updateList={updateList}/>
                        {id.current === null? <></> : <UpdateCategory updateList={updateList} IdData={id.current} show={updatePanelVisible} onHide={() => setUpdatePanelVisible(false)} hide={updatePanelVisible}/>}
                    </Form>
                </div>}
        </Container>
    );
})

export default CategoryList;