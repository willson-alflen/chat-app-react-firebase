import Messages from '../Messages'
import Typing from '../Typing'
import * as S from './styles'
import { BsWebcamFill } from 'react-icons/bs'
import { MdPersonAdd, MdMoreVert } from 'react-icons/md'

export default function Chat() {
  return (
    <S.Chat>
      <S.ChatHeader>
        <span>John Doe</span>
        <S.ChatIcons>
          <BsWebcamFill className="chat-icon" />
          <MdPersonAdd className="chat-icon" />
          <MdMoreVert className="chat-icon" />
        </S.ChatIcons>
      </S.ChatHeader>
      <S.ChatBody>
        <Messages />
      </S.ChatBody>
      <S.ChatFooter>
        <Typing />
      </S.ChatFooter>
    </S.Chat>
  )
}
