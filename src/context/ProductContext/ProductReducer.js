export const ProductReducer = (state, action) => {

  switch (action.type) {

    case 'LOAD_PRODUCTS_DATA':
      return {
        ...state,
        availableProducts: action.availableProducts,
        flagProductsDataLoaded: action.flagProductsDataLoaded
      }

    case 'SET_PRODUCT_DETAILS':
      return {
        ...state,
        productInfo: { 
          ...state.productInfo, 
          ...{
                id: action.id,
                display: action.display,
                name: action.name,
                price: action.price,
                description: action.description,
                image: action.image
             } 
        }
      }

    case 'LOAD_CART':
      return {
        ...state,
        shoppingCart: action.updatedCart,
        cartId: action.cartId
      }

    case 'UPDATE_CART':
      return {
        ...state,
        shoppingCart: action.updatedCart
      }

    default:
      return state

  }

}