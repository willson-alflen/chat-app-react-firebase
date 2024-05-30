import { createContext, useEffect, useReducer, useState } from 'react'
import { auth, getChatsForUser } from '../../db/firebase'
import PropTypes from 'prop-types'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user }
    case 'LOGOUT':
      return { ...state, user: null, currentChat: null }
    case 'SET_CURRENT_CHAT':
      return {
        ...state,
        currentChat: action.chat,
        chattingWithUser: action.chattingWithUser,
      }
    case 'SET_CHATS':
      return { ...state, chats: action.chats }
    default:
      return state
  }
}

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    currentChat: null,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        dispatch({ type: 'LOGIN', user: authUser })
        try {
          const chats = await getChatsForUser(authUser.uid)
          dispatch({ type: 'SET_CHATS', chats })
        } catch (error) {
          console.error('Error fetching chats: ', error)
        }
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
