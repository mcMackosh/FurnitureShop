import React, {useContext, useState, useEffect, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { Context } from '../../index';
import { deleteFurniture, fetchFurnitures } from '../../http/shopBase';
import { observer } from 'mobx-react';
import UpdateFurniture from './updateFurniture';
import {PagesAdminFurniture} from '../pages';
import CreateFurniture from './createFurniture';



const API = process.env.REACT_APP_API_URL
const FurnitureUD = observer(() => {
    const id = React.useRef(null)
    // let furnitureId = 0
    const [pageLoad, setPageLoad] = useState(true)
    const [updateFurnitureVisible, setUpdateFurnitureVisible] = useState(false)
    const [createFurnitureVisible, setCreateFurnitureVisible] = useState(false)
    const [rerender, setRerender] = useState(0)

    const {shop} = useContext(Context)
    
    const setFurnitureId = (Dataid) => 
    {
        id.current = Dataid
    }
    const del = (id) =>
    {
        deleteFurniture(id)
        updateList()
    } 
    const updateList = () =>
    {
        fetchFurnitures(`api/furniture/getAllFurniture?page=${shop.pageAdminFurniture}&limit=${shop.limitAdminFurniture}`).then(data => {
            console.log(data.rows)
            shop.setFurnitures(data.rows)
            shop.setTotalCountAdminFurniture(data.count)
            
        }).catch(e => alert(e.message))
    }

    useEffect(()=>
    {
       fetchFurnitures(`api/furniture/getAllFurniture?page=${shop.pageAdminFurniture}&limit=${shop.limitAdminFurniture}`).then(data => {
            console.log(data.rows)
            shop.setFurnitures(data.rows)
            shop.setTotalCountAdminFurniture(data.count)
            setPageLoad(false)
        }).catch(e => alert(e.message))
    }, [shop.pageAdminFurniture, shop.selectedType, shop.selectedBrand])
    return (
        <Container style={{ marginTop: '20px' }}>
            <Button variant="outline-success" className="me-2" onClick={() => setCreateFurnitureVisible(true)}>Create new furniture</Button>
            {pageLoad ?
                <div>
                    <Spinner animation="border" />
                </div> :
            <Form aria-label="Default select example">
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Img</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="justify-content-center" >
                        {shop.furnitures.map((furniture) =>
                            <tr key={furniture.id}>
                                <td >{furniture.id}</td>
                                <td>{furniture.name}</td>
                                <td>₴{furniture.price}</td>
                                <td ><Image style={{ width: '150px' }} src={API + furniture.img} /></td>
                                <td><Button variant="outline-warning" onClick={() =>  { setFurnitureId(furniture.id), setUpdateFurnitureVisible((visible) => !visible)}}>Update</Button></td>
                                <td><Button variant="outline-danger" onClick={() => del(furniture.id)}>Delete</Button></td>
                            </tr>    
                        )}   
                    </tbody>
                </Table>
                {updateFurnitureVisible === true ? <UpdateFurniture IdData={id.current} onHide={() => setUpdateFurnitureVisible(false)} updateList={updateList}/> : <></>}
                <CreateFurniture  show={createFurnitureVisible} onHide={() => setCreateFurnitureVisible(false)} updateList={updateList}/>
            </Form>}
            <PagesAdminFurniture/>
        </Container>

    )
})

export default FurnitureUD;