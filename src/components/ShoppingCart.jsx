import { useState, useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext/ProductContext'
import { UserContext } from '../context/UserContext/UserContext'
import { pageNums } from '../context/globalConstants'

export const ShoppingCart = ({ changePage }) => {

  const {
    availableProducts,
    shoppingCart,
    updateCart,
    cartId, 
    saveCartToDatabase
  } = useContext( ProductContext )

  const { id } = useContext( UserContext )

  const { productList } = pageNums

  const [itemsToDisplay, setItemsToDisplay] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    let currentProductIds = availableProducts.map( product => { return [ product, 0 ] } )
    let totalPrice = 0
    shoppingCart.forEach( id => {
      const idToIncrement = currentProductIds.findIndex( product => { return parseInt( product.at(0).id ) === id } )
      currentProductIds[idToIncrement][1] += 1
    })
    setItemsToDisplay( currentProductIds.filter( pair => { return pair.at(1) !== 0 } ) )
    currentProductIds.forEach( ( [ product, qty ] ) => { totalPrice += parseFloat( product.price ) * qty } )
    setTotalPrice( totalPrice )
    // eslint-disable-next-line
  }, [shoppingCart])
  
  const increaseProdQty = ( event ) => { 
    updateCart( [ ...shoppingCart, parseInt(event.target.__reactFiber$xjanx0ju2c.return.key) ] ) 
  }

  const decreaseProdQty = ( event ) => { 
    let cartCopy = [ ...shoppingCart ]
    cartCopy.splice( shoppingCart.findIndex( id => { return id === parseInt(event.target.__reactFiber$xjanx0ju2c.return.key) } ), 1 )
    updateCart( cartCopy ) 
  }

  const saveCart = () => {
    saveCartToDatabase( cartId, id, shoppingCart )
  }

  const goBack = () => changePage( productList )

  return (
    <>
      <h1>Shopping cart</h1>
      <h3>Total price: ${ totalPrice.toFixed(2) }</h3>

      <button onClick={ saveCart }>Save cart to database</button>
      <button onClick={ goBack }>Go back</button>

      <div className='card-grid'>
      {
        itemsToDisplay.length === 0 
          ? <h2>Shopping cart empty</h2>
          : itemsToDisplay.map( ( [ product, qty ] ) => ( 
              <li className='card' key={ product.id }>
                <img src={ product.image } alt={ product.name } />
                <p>{ product.name }</p>
                <p>Unit. Price: ${ product.price }</p>
                <p>Qty: { qty }</p>
                <button onClick={ increaseProdQty }> + </button>
                <button onClick={ decreaseProdQty }> - </button>
              </li>
            ))
      }
      </div>
    </>
  )
}
