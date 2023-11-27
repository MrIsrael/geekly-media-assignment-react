import { useState, useContext } from 'react'
import { ProductContext } from '../context/ProductContext/ProductContext'
import { pageNums } from '../context/globalConstants'

export const ProductList = ({ changePage }) => {

  const {
    availableProducts, 
    setProductDetails
  } = useContext( ProductContext )

  const { productDetails, shoppingCart } = pageNums

  const [ inputValue, setInputValue ] = useState('')
  const [ prodList, setProdList ] = useState(availableProducts)

  const onInputChange = ({ target }) => {
    setInputValue( target.value )
  }

  const onProductClick = ({ target }) => {
    setProductDetails( availableProducts.find( product => product.name === target.innerHTML ) )
    changePage( productDetails )
  }

  const onCartBtnClick = () => {
    changePage( shoppingCart )
  }

  const onSubmit = ( event ) => {
    event.preventDefault()
    if ( inputValue.trim().toLowerCase() === 'reset' ) { 
      setProdList( availableProducts )
      setInputValue('')
      return
    }
    setProdList( prodList.filter( prod => { return prod.name.toLowerCase().includes( inputValue.trim().toLowerCase() ) } ) )
    setInputValue('')
  }

  return (
    <>
      <h1>Products List</h1>
      <h3>Filter by name available</h3>
      <h3>Submit word 'reset' to restore list</h3>

      <form onSubmit={ onSubmit }>
        <input 
          autoFocus
          type="text"
          placeholder="Filter products by name"
          value={ inputValue }
          onChange={ onInputChange }
        />
      </form>

      <button onClick={ onSubmit }>Filter</button>
      <button onClick={ onCartBtnClick }>Go to cart</button>
      
      <h4>Click on any name to go to Product Details page</h4>

      {
        prodList.length === 0 
          ? <h2>No results</h2>
          : prodList.map( ( product ) => ( 
              <li 
                key={ product.id }
                onClick={ onProductClick }
              >{ product.name }</li>
            ))
      }
    </>
  )
}
