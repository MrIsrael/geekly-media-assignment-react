import { createContext, useReducer } from 'react'
import axios from 'axios'

// State and Reducer for this Context
import { UserState } from './UserState'
import { UserReducer } from './UserReducer'

// Get related Global Constants and Utils
import { sheetNumsDB, endpoints } from '../globalConstants'

// Create Context
export const UserContext = createContext(UserState)

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, UserState)
  const { users } = sheetNumsDB
  const { apiEndpoint } = endpoints

  // *** ACTIONS ***

  const userLogin = async ( email, password ) => {
    let informationText, flagLoginSuccess
    const url = apiEndpoint.concat(`find-row-by-column-name-and-value/${users}/email/${email}/pass/${password}`)
    const { data } = await axios.get(url)

    // In case email not found:
    if (data.zeroIndexRowNumber === -1) { 
      informationText = 'Email not found. Please verify and try again.' 
      flagLoginSuccess = false
    } 
    // In case email is found:
    else { 
      // If password input matches database register:
      if (data.passwordMatch) {
        informationText = 'Login in process...' 
        flagLoginSuccess = true
      } 
      // If password input does not match database register:
      else {
        informationText = 'Wrong password. Please verify and try again.'
        flagLoginSuccess = false
      }
      dispatch({
        type: 'USER_LOGIN_DATA',
        id: data.rowData.id,
        email: data.rowData.email
      })
    }
    dispatch({
      type: 'USER_LOGIN_FLAGS',
      informationText: informationText,
      flagLoginSuccess: flagLoginSuccess
    })
  }

  const userRegistration = async ( email, password ) => {
    const url = apiEndpoint.concat(`${users}`)
    const response = await axios.post(url, { email: email, password: password })

    dispatch({
      type: 'USER_LOGIN_DATA',
      id: response.data.newId,
      email: email
    })
    dispatch({
      type: 'USER_LOGIN_FLAGS',
      informationText: 'Registering user...',
      flagLoginSuccess: true
    })
  }

  return (
    <UserContext.Provider 
      value={{
        id: state.id,
        email: state.email,
        flagLoginSuccess: state.flagLoginSuccess,
        informationText: state.informationText,
        userLogin,
        userRegistration
      }}
    >
      { children }
    </UserContext.Provider>
  )
}