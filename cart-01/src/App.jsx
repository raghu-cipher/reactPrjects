import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Products from './components/Products/Products';
import CartSummary from './components/CartSummary/CartSummary';
import Cart from './components/cartItems/Cart';

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;


const App = () => {
  const [cart, setCart] = useState([])
  const [quantity , setQuantity] = useState(1)

  const handleClick = (productDetails) => {
    // console.log(productDetails)
    let isPresent = false ;
    cart.find((item) => {
      if (productDetails.id === item.id) {
        isPresent = true 
      }
    })
    if (isPresent) return ;
    setCart([...cart,{...productDetails,quantity}])
  }

  //Increment Quantity 

  const handleIncrementQuantity = (id) => {
    // console.log(`click ${id}`)
    setCart(prevCart => 
      prevCart.map(eachItem => {
        if (eachItem.id === id) {
          const updateQuantity = eachItem.quantity + 1 
          return {...eachItem, quantity : updateQuantity}
        }
         return eachItem 
      })
    )
  }

  // Decrement Quantity 
  const handleDecrementQuantity = (id) => {
    // console.log(`click ${id}`)
    const productObject = cart.find(eachItem => eachItem.id === id) 
    if (productObject.quantity > 1) {
      setCart(prevCart => 
        prevCart.map(eachCartItem => {
          if (eachCartItem.id === id) {
            const updateQuantity = eachCartItem.quantity - 1
            return {...eachCartItem,quantity : updateQuantity}
          }
          return eachCartItem 
        })
      )
    }
   
  }

  // total Amount 
  let total = 0 ;
  cart.forEach(eachItem => {
    total += eachItem.price * eachItem.quantity 

  })
  // console.log(total)

  // eligible Gift 
  const eligibleGift = total > 1000 ;
  
  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <div className='main-cont'>
      <h4 className='main-heading'>Shopping Cart</h4>

      <div className="products-cont">
        <h4>Products</h4>
        <ul className='list-item-cont'>
          {
            PRODUCTS.map((eachItem) => (
              <Products key={eachItem.id} productDetails = {eachItem}
                        handleClick = {handleClick}
              />
            ))
          }
        </ul>
        
      </div>

      <div className='cart-summary-cont'>
      <h4>Cart Summary</h4>
      <CartSummary totalAmount = {total} eligibleGift = {eligibleGift}/>
      </div>

      <div className='cart-items-cont'>
        <h4>Cart Items</h4>
        <ul className='cart-list-cont'>
          {
            cart.map(eachItem => (
              <Cart key={eachItem.id} 
                    cartDetails = {eachItem}
                    increment = {handleIncrementQuantity}
                    decrement = {handleDecrementQuantity}
                    

              />
            ))
          }
        </ul>
        {
          eligibleGift && 
           <div className='eligible-cont'>
             <div className='cart-details'>
               <p className='cart-product-name'>Wireless Mouse</p>
               <p className='cart-price'>₹0 * 1 = 
                <span>₹0</span>
               </p>
              </div>
              <div className='gift-button'>
                FREE GIFT
              </div>
           </div>
        }
      </div>
      
    </div>
  )
}

export default App