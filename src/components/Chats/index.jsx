import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import * as S from './styles'
import { FaCircleUser } from 'react-icons/fa6'

export default function Chats() {
  const { chats, dispatch } = useContext(UserContext)

  const openUserChat = (chat) => {
    dispatch({
      type: 'SET_CURRENT_CHAT',
      chat,
      chattingWithUser: chat.chatWithUser,
    })
  }

  return (
    <S.Chats>
      {chats && chats.length > 0 ? (
        chats.map((chat) => {
          const lastMessage = chat.messages[chat.messages.length - 1]
          return (
            <S.UserChat key={chat.id} onClick={() => openUserChat(chat)}>
              {chat.chatWithUser.imageURL ? (
                <img
                  src={chat.chatWithUser.imageURL}
                  alt={chat.chatWithUser.name}
                  className="user-icon"
                />
              ) : (
                <FaCircleUser className="user-icon" />
              )}
              <div>
                <span>{chat.chatWithUser.name}</span>
                <p>{lastMessage ? lastMessage.message : 'No messages yet'}</p>
              </div>
            </S.UserChat>
          )
        })
      ) : (
        <p>No chats yet</p>
      )}
    </S.Chats>
  )
}

// {currentUser && currentUser.chats && currentUser.chats.length > 0 ? (
//   currentUser.chats.map((chat) => (
//     <S.UserChat key={chat.id}>
//       <FaCircleUser className="user-icon" />
//       <div>
//         <span>{chat.userName}</span>
//         <p>{chat.lastMessage}</p>
//       </div>
//     </S.UserChat>
//   ))
// ) : (
//   <p>No chats yet</p>
// )}
