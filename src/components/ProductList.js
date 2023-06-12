import React, { useContext } from 'react'
import { Context } from '../index'
import Image from "react-bootstrap/Image"
import whiteStar from "./IMGcomponents/whiteStar.png"
import { useNavigate } from "react-router-dom"
import '../pages/css/CSSforShop.css'
import { observer } from 'mobx-react'
import {createBasket} from '../http/shopBase';

const API = process.env.REACT_APP_API_URL

const ProductList = observer(() => {
  const { shop,user } = useContext(Context)
  const navigate = useNavigate()

  const addToBasket = (id) => {

    createBasket({ userId: user.getUser().id, furnitureId: id }).then(data => { console.log(data), alert("Your order is created please go to Basket") }).catch(e => alert(e.message))
  }
  console.log(process.env)
      
  return (
    <div className="body1">
      <div className="galleryforshop">
        {shop.furnitures.map(furniture =>
          <div key={furniture.id} className="product-card" >
            <div className="product-image" onClick={() => navigate('/product/' + furniture.id)}>
              <img src={API + furniture.img} alt={furniture.name} />
            </div>
            <div className="product-details" onClick={() => navigate('/product/' + furniture.id)}>
              <h3 className="product-name" >{furniture.name}</h3>
              <p className="product-price" >${furniture.price}</p>
              {furniture.rait != 0 ? <div> Raiting: {Array(furniture.rait).fill(1).map((start, el) => <Image  key={el} style={{ width: 19, height: 19 }} src={whiteStar} />)}</div> : <></>}
              
            </div>
            <button className="add-to-cart-btn" onClick={() => addToBasket(furniture.id)}>Add to Cart</button>
          </div>
        )}
      </div>
    </div>
  )
})

export default ProductList