import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import PropTypes from 'prop-types'
import * as S from './styles'
import { FaCircleUser } from 'react-icons/fa6'

export default function Message({ message }) {
  const { user: currentUser, chattingWithUser } = useContext(UserContext)
  const date = new Date(message.timestamp)
  const formattedTimestamp = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
  const photoUrl =
    message.sender === currentUser.uid
      ? currentUser.photoURL
      : chattingWithUser.imageURL
  const isCurrentUser = message.sender === currentUser.uid

  return (
    <S.Message $isCurrentUser={isCurrentUser}>
      <S.MessageInfo $isCurrentUser={isCurrentUser}>
        {photoUrl ? (
          <img className="user-icon" src={photoUrl} alt="User icon" />
        ) : (
          <FaCircleUser className="user-icon" />
        )}
        <span>{formattedTimestamp}</span>
      </S.MessageInfo>
      <S.MessageContent $isCurrentUser={isCurrentUser}>
        <S.MessageText>{message.message}</S.MessageText>
        {message.image && <S.MessageImage src={message.image} />}
      </S.MessageContent>
    </S.Message>
  )
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
}
