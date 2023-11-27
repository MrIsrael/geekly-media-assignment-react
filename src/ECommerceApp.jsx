// Node modules & hooks
import { useState } from 'react'

// Providers from context
import { UserProvider } from './context/UserContext/UserContext'
import { ProductProvider } from './context/ProductContext/ProductContext'

// Page components
import { UserManagement } from './components/UserManagement'
import { ProductList } from './components/ProductList'
import { ProductDetails } from './components/ProductDetails'
import { ShoppingCart } from './components/ShoppingCart'


export const ECommerceApp = () => {

  const [flag, setFlag] = useState(0) // TODO
  const changePage = (val) => { setFlag(val) }

  return (
    <UserProvider>
      <ProductProvider>

        <div>
          {flag === 0 && <UserManagement changePage = { changePage } />}
          {flag === 1 && <ProductList changePage = { changePage } />}
          {flag === 2 && <ProductDetails changePage = { changePage } />}
          {flag === 3 && <ShoppingCart changePage = { changePage } />}
        </div>

      </ProductProvider>
    </UserProvider>
  )
}
