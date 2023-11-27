import { createContext, useReducer } from 'react'
import axios from 'axios'

// State and Reducer for this Context
import { ProductState } from './ProductState'
import { ProductReducer } from './ProductReducer'

// Get related Global Constants and Utils
import { sheetNumsDB, endpoints } from '../globalConstants'

// Create Context
export const ProductContext = createContext(ProductState)

// Provider component
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, ProductState)
  const { products, shoppingCarts } = sheetNumsDB
  const { apiEndpoint } = endpoints

  // *** ACTIONS ***

  const loadProductsData = async () => {
    const url = apiEndpoint.concat(`get-rows/${products}`)
    const { data } = await axios.get(url)

    dispatch({
      type: 'LOAD_PRODUCTS_DATA',
      availableProducts: data.rowsData,
      flagProductsDataLoaded: true
    })
  }

  const setProductDetails = ({ id, display, name, price, description, image }) => {
    dispatch({
      type: 'SET_PRODUCT_DETAILS',
      id,
      display,
      name,
      price,
      description,
      image
    })
  }

  const loadShoppingCart = async ( userId ) => {
    const url = apiEndpoint.concat(`find-row-by-column-name-and-value/${shoppingCarts}/userId/${userId}`)
    const { data } = await axios.get(url)

    dispatch({
      type: 'LOAD_CART',
      updatedCart: data.zeroIndexRowNumber === -1 ? [] : JSON.parse( data.rowData.shoppingCart ),
      cartId: data.zeroIndexRowNumber === -1 ? 0 : parseInt( data.rowData.id )
    })
  }

  const updateCart = ( updatedCart ) => {
    dispatch({
      type: 'UPDATE_CART',
      updatedCart
    })
  }

  const saveCartToDatabase = async ( cartId, userId, cart ) => {
    // If there is no prior shopping cart saved for logged user, create a new one:
    if ( cartId === 0 ) {
      const url = apiEndpoint.concat(`${shoppingCarts}`)
      const response = await axios.post(url, { userId: userId, shoppingCart: JSON.stringify(cart) })
      dispatch({
        type: 'LOAD_CART',
        updatedCart: cart,
        cartId: response.data.newId
      })
    } // Otherwise, overwrite existing cart:
    else {
      const url = apiEndpoint.concat(`${shoppingCarts}/${cartId}`)
      await axios.patch(url, { shoppingCart: JSON.stringify(cart) })
      dispatch({
        type: 'UPDATE_CART',
        updatedCart: cart
      })
    }
  }

  return (
    <ProductContext.Provider 
      value={{
        availableProducts: state.availableProducts,
        flagProductsDataLoaded: state.flagProductsDataLoaded,
        productInfo: state.productInfo,
        shoppingCart: state.shoppingCart,
        cartId: state.cartId,
        loadProductsData,
        setProductDetails,
        loadShoppingCart,
        updateCart,
        saveCartToDatabase
      }}
    >
      { children }
    </ProductContext.Provider>
  )
}