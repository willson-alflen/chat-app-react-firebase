import Message from '../Message'
import * as S from './styles'

export default function Messages() {
  return (
    <S.MessagesContainer>
      <Message />
      <Message />
      <Message />
    </S.MessagesContainer>
  )
}
