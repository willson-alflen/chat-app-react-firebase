import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { addMessageToChat } from '../../db/firebase'
import { toast } from 'react-toastify'
import * as S from './styles'
import { FaPaperclip } from 'react-icons/fa6'
import { MdImageSearch, MdSend } from 'react-icons/md'

export default function Typing() {
  const { currentChat, user: currentUser } = useContext(UserContext)
  const [message, setMessage] = useState('')

  const handleInputChange = (e) => {
    setMessage(e.target.value)
  }

  const handleButtonClick = async () => {
    if (message.trim() !== '' && currentChat && currentUser) {
      const messageData = {
        message,
        sender: currentUser.uid,
        timestamp: new Date().toISOString(),
      }
      try {
        await addMessageToChat(currentChat.id, messageData)
        setMessage('')
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleButtonClick()
    }
  }

  return (
    <S.TypingContainer>
      <S.TypingArea
        placeholder="type a message here..."
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <S.TypingActions>
        <S.TypingIcons>
          <FaPaperclip className="typing-icon" />
          <MdImageSearch className="typing-icon" />
        </S.TypingIcons>
        <S.TypingButton onClick={handleButtonClick}>
          <MdSend className="send-icon" />
        </S.TypingButton>
      </S.TypingActions>
    </S.TypingContainer>
  )
}
