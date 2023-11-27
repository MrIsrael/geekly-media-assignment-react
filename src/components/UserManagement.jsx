import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext/UserContext'
import { ProductContext } from '../context/ProductContext/ProductContext'
import { pageNums } from '../context/globalConstants'

export const UserManagement = ({ changePage }) => {

  const { 
    userLogin,
    userRegistration,
    id,
    flagLoginSuccess,
    informationText
  } = useContext( UserContext )

  const {
    loadProductsData,
    loadShoppingCart,
    flagProductsDataLoaded
  } = useContext( ProductContext )

  const { productList } = pageNums

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if ( flagLoginSuccess ) {
      loadShoppingCart( id )
      loadProductsData()
    }
    // eslint-disable-next-line
  }, [flagLoginSuccess])

  useEffect(() => {
    if ( flagProductsDataLoaded ) changePage( productList )
    // eslint-disable-next-line
  }, [flagProductsDataLoaded])

  const onEmailChange = ({ target }) => { setEmail( target.value ) }
  const onPasswordChange = ({ target }) => { setPassword( target.value ) }

  const onLogin = ( event ) => {
    event.preventDefault()
    userLogin( email, password )
    setPassword('')
  }

  const onRegister = ( event ) => {
    event.preventDefault()
    userRegistration( email, password )
    setPassword('')
  }

  return (
    <>
      <h1>E-Commerce Website</h1>
      <h3>User registration / login</h3>

      <form>
        <input 
          autoFocus
          required
          type="email"
          placeholder="Please enter your email"
          value={ email }
          onChange={ onEmailChange }
        />

        <input 
          required
          type="password"
          placeholder="Enter your password here"
          value={ password }
          onChange={ onPasswordChange }
        />
      </form>

      <button onClick={ onLogin }>Login</button>
      <button onClick={ onRegister }>Register</button>

      {
        informationText !== '' && ( <h2>{ informationText }</h2> )
      }
    </>
  )
}
