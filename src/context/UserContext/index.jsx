import { createContext, useEffect, useReducer, useState } from 'react'
import { auth } from '../../db/firebase'
import PropTypes from 'prop-types'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user }
    case 'LOGOUT':
      return { ...state, user: null }
    default:
      return state
  }
}

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: 'LOGIN', user: authUser })
      } else {
        dispatch({ type: 'LOGOUT' })
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{ ...state, dispatch, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UserContext, UserProvider }
