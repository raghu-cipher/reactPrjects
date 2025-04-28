import React from 'react'
import './products.css'

const Products = (props) => {
    const {productDetails,handleClick} = props 
    const {id,name,price} = productDetails 
  return (
    <li className='product-list-item-cont'>
        <h4 className='product-name'>{name}</h4>
        <p className='product-price'>{price}</p>
        <button className='add-btn'
                onClick={() => handleClick(productDetails)}
        >Add to Cart</button>
    </li>
  )
}

export default Products