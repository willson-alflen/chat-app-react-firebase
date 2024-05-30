import PropTypes from 'prop-types'
import Message from '../Message'
import * as S from './styles'

export default function Messages({ messages }) {
  return (
    <S.MessagesContainer>
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))
      ) : (
        <S.NoMessages>No messages yet</S.NoMessages>
      )}
    </S.MessagesContainer>
  )
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
}
