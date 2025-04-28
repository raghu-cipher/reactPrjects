import React from 'react'
import './cartsummary.css'

const CartSummary = ({totalAmount,eligibleGift}) => {
    const offerAmount = 1000 - totalAmount 
    const progressClass = totalAmount * 100 / 1000 
  return (
    <div className='summary-cont'>
      <div className='sub-cont'>
        <h4 className='cart-heading'>Subtotal:</h4>
        <h4 className='cart-heading'>₹{totalAmount}</h4>
      </div>
      <hr />
      {
        eligibleGift ? 
            <div className='apply-offer'>
                <p className='summary-text'>You got a free Wireless Mouse! </p>
            </div> : 
            <div className='coupon-cont'>
                <p className='summary-text'>Add ₹{offerAmount} more to get a FREE Wireless Mouse!</p>
                <div className='progressbar'>
                    <div className='progressfill' style={{
                        width : `${progressClass}%`
                    }}>
                    </div>
                </div>
            </div>
      }
    </div>
  )
}

export default CartSummary