import React, { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import CreateFurniture from '../components/ComponentsForAdmin/createFurniture'
import CreateType from '../components/ComponentsForAdmin/createCategory'
import CreateProducer from '../components/ComponentsForAdmin/createProducer'
import FurnitureList from '../components/ComponentsForAdmin/FurnitureList';
import {Context} from "../index"
import "../pages/css/AdminProductList.css"
import CategoryList from '../components/ComponentsForAdmin/categoryList';
import ProducerList from '../components/ComponentsForAdmin/producerList';



const Admin = () =>
{
  const [chsoisePage, setchsoisePage] = useState('furniture');
  const {shop} = useContext(Context)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [producerVisible, setProducerVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [furnitureVisible, setFurnitureVisible] = useState(false)

  
 

  return (
    <>
      <ButtonToolbar style={{ justifyContent: "center", margin: 10 }} className="mb-3" aria-label="Toolbar with Button groups">
        <ButtonGroup className="me-2" aria-label="First group">
          <Button variant="secondary" onClick={() => setchsoisePage('furniture')}>Furnitures</Button>{' '}
          <Button variant="secondary" onClick={() => setchsoisePage('type')}>Category</Button>{' '}
          <Button variant="secondary" onClick={() => setchsoisePage('producer')}>Producer</Button>
        </ButtonGroup>
      </ButtonToolbar>
      {chsoisePage == 'furniture' ? <FurnitureList/> : <div></div>}
      {chsoisePage == 'type' ? <CategoryList/> : <div></div>}
      {chsoisePage == 'producer' ?<ProducerList/> : <div></div>}
    </> 
  );
}

export default Admin