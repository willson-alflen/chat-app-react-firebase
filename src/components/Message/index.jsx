import * as S from './styles'
import { FaCircleUser } from 'react-icons/fa6'

export default function Message() {
  return (
    <S.Message>
      <S.MessageInfo>
        <FaCircleUser className="user-icon" />
        <span>just now</span>
      </S.MessageInfo>
      <S.MessageContent>
        <S.MessageText>Hello there</S.MessageText>
        <S.MessageImage src="https://via.placeholder.com/1500x1500" />
      </S.MessageContent>
    </S.Message>
  )
}
