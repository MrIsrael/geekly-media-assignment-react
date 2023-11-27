export const UserReducer = (state, action) => {

  switch (action.type) {

    case 'USER_LOGIN_DATA':
      return {
        ...state,
        id: action.id,
        email: action.email
      }

    case 'USER_LOGIN_FLAGS':
      return {
        ...state,
        informationText: action.informationText,
        flagLoginSuccess: action.flagLoginSuccess
      }

    default:
      return state

  }

}