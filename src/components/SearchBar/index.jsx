import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import {
  addUserToChat,
  createChat,
  findUserByUsername,
  getChatIfExists,
} from '../../db/firebase'
import { toast } from 'react-toastify'
import * as S from './styles'
import { FaCircleUser } from 'react-icons/fa6'

export default function SearchBar() {
  const { user: currentUser, dispatch } = useContext(UserContext)
  const [showUserChats, setShowUserChats] = useState(false)
  const [username, setUsername] = useState('')
  const [foundUsers, setFoundUsers] = useState([])
  const [searching, setSearching] = useState(false)

  const handleUserSearch = async (e) => {
    if (e.key === 'Enter') {
      setSearching(true)
      setShowUserChats(true)
      try {
        const users = await findUserByUsername(username)
        setFoundUsers(users)
        setSearching(false)
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const openUserChat = async (e) => {
    const chattingWithUser = foundUsers.find(
      (user) => user.name === e.target.innerText
    )
    setShowUserChats(false)
    setUsername('')
    try {
      const chat = await getChatIfExists(currentUser, chattingWithUser)
      if (!chat) {
        try {
          const newChat = await createChat(currentUser, chattingWithUser)
          dispatch({
            type: 'SET_CURRENT_CHAT',
            chat: newChat,
            chattingWithUser,
          })
          // Add the new chat to the current user's chats array
          await addUserToChat(currentUser.uid, newChat.id)
        } catch (error) {
          toast.error(error.message)
        }
      } else {
        dispatch({ type: 'SET_CURRENT_CHAT', chat, chattingWithUser })
        // Add the existing chat to the current user's chats array
        await addUserToChat(currentUser.uid, chat.id)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (username === '') {
      setFoundUsers([])
      setShowUserChats(false)
    }
  }, [username])

  return (
    <S.SearchBar>
      <S.SearchInput
        type="text"
        placeholder="Search"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleUserSearch}
      />

      {searching ? null : showUserChats && username !== '' ? (
        foundUsers.length > 0 ? (
          foundUsers.map((user) => (
            <S.UserChat key={user.uid} onClick={openUserChat}>
              {user.imageURL ? (
                <img
                  src={user.imageURL}
                  alt={user.name}
                  className="user-icon"
                />
              ) : (
                <FaCircleUser className="user-icon" />
              )}
              <span>{user.name}</span>
            </S.UserChat>
          ))
        ) : (
          <span>No user found</span>
        )
      ) : null}
    </S.SearchBar>
  )
}
