import { useContext } from 'react'
import { ProductContext } from '../context/ProductContext/ProductContext'
import { pageNums } from '../context/globalConstants'

export const ProductDetails = ({ changePage }) => {

  const {
    productInfo,
    shoppingCart,
    updateCart
  } = useContext( ProductContext )

  const { productList } = pageNums

  const addToCart = () => {
    updateCart( [ ...shoppingCart, parseInt(productInfo.id) ] )
    changePage( productList )
  }

  const goBack = () => changePage( productList )

  return (
    <>
      <h1>Product Details</h1>

      <button onClick={ addToCart }>Add to cart</button>
      <button onClick={ goBack }>Back</button>

      <div className='card'>
        <img src={ productInfo.image } alt={ productInfo.name } />
        <p>{ productInfo.name }</p>
        <p>Price: ${ productInfo.price }</p>
        <p>{ productInfo.description }</p>
      </div>

      <button onClick={ addToCart }>Add to cart</button>
      <button onClick={ goBack }>Back</button>
    </>
  )
}
