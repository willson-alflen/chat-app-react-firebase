import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import Messages from '../Messages'
import Typing from '../Typing'
import { getChatMessages } from '../../db/firebase'
import * as S from './styles'
import { BsWebcamFill } from 'react-icons/bs'
import { MdPersonAdd, MdMoreVert } from 'react-icons/md'

export default function Chat() {
  const { currentChat, chattingWithUser } = useContext(UserContext)
  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    let unsubscribe = () => {}

    if (currentChat) {
      unsubscribe = getChatMessages(currentChat.id, setChatMessages)
    }

    return () => unsubscribe()
  }, [currentChat])

  return (
    <S.Chat>
      <S.ChatHeader>
        <span>
          {chattingWithUser
            ? `Chat with ${chattingWithUser.name}`
            : 'No chat selected'}
        </span>
        <S.ChatIcons>
          <BsWebcamFill className="chat-icon" />
          <MdPersonAdd className="chat-icon" />
          <MdMoreVert className="chat-icon" />
        </S.ChatIcons>
      </S.ChatHeader>
      <S.ChatBody>
        <Messages messages={chatMessages} />
      </S.ChatBody>
      <S.ChatFooter>
        <Typing />
      </S.ChatFooter>
    </S.Chat>
  )
}
