import React, { useContext, useEffect, useState } from 'react'
import "./css/ProductPage.css"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import CommentPanel from '../components/ComponentsForAdmin/commentPanel'
import {useParams} from 'react-router-dom'
import { fetchOneFurniture, fetchOneProducer, fetchOneType ,createBasket} from '../http/shopBase'
import {Context} from "../index"



const API = process.env.REACT_APP_API_URL


const ProductDetail = () => {
  const [update, setUpdate] = useState(0)
  const [pickStar, setPickStar] = useState(0)
  const [product, setProduct] = useState({features: []})
  const {id} = useParams()
  const {shop} = useContext(Context)
  const {user} = useContext(Context)
  const [pageLoad, setPageLoad] = useState(false);
  
  const addToBasket = () =>
  {
      createBasket({userId: user.getUser().id, furnitureId: product.id}).then(data => {console.log(data), alert("Your order is created please go to Basket")}).catch(e => alert(e.message))
      
  }

  useEffect(()=> 
  {
    fetchOneFurniture(id).then(data =>
      {
        fetchOneProducer(data.producerId).then(data => {shop.setChoiseProducers(data), setUpdate(prev => prev + 1)})
        setProduct(data)
        setPickStar(data.rait)
        setPageLoad(true)
        console.log(data)
        
      }).catch(e => alert(e.message))    
      return () =>
      {
        shop.setChoiseProducers({})
        shop.setChoiseType({})
      }        
  },[])
  
  return (
    <div>
      {pageLoad == false ?
        <div>
          <Spinner animation="border" />
        </div> :
        <Container style={{ marginTop: '20px' }} fluid="md">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={API + product.img} alt="Product Image" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h1 className="product-name">{product.name}</h1>
              <h2 className="product-price">Price: ${product.price}</h2>
              <div className="product-rating"> 
                {Array(pickStar).fill(1).map((el, i) => (
                  <span key={i} className="fa fa-star checked"></span>
                ))}
              </div>
              <h3 className="manufacturer-name">Producer: {product.producer.name}</h3>
              <h4 className="product-parameters">Parameters:</h4>
              <ul className="product-features">
                {product.features.map((info, index) => (
                  <li key={index}>
                    <strong>{info.title}: </strong>
                    {info.descriptionId !== 0 ? <span>{info.description}</span> : <span>Null</span>}
                  </li>
                ))}
              </ul>
              <Button variant="dark" style={{ marginRight: '10px' }} onClick={addToBasket}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <CommentPanel furnitureId={product.id} />
      </Container>}
    </div>
  )
}

export default ProductDetail