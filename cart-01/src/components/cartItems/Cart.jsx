import React from 'react'
import './cart.css'

const Cart = (props) => {
    const {cartDetails,increment,decrement} = props 
    const {id,name,price,quantity} = cartDetails
  return (
    <li className='cart-item-cont'>
        <div className='cart-details'>
            <p className='cart-product-name'>{name}</p>
            <p className='cart-price'>{price} * 2 

                <span className=''>=₹100</span>
            </p>
        </div>

        <div className="cartbuttons">
            <button className='btn btn-red'
                    onClick={() => decrement(id)}
            >-</button>
            <span className='quantity'>{quantity}</span>
            <button className='btn btn-green'
                    onClick={() => increment(id)}
            >+</button>
        </div>
    </li>
  )
}

export default Cart