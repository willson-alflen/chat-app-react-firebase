import * as S from './styles'
import { FaPaperclip } from 'react-icons/fa6'
import { MdImageSearch, MdSend } from 'react-icons/md'

export default function Typing() {
  return (
    <S.TypingContainer>
      <S.TypingInput type="text" placeholder="type a message here..." />
      <S.TypingActions>
        <S.TypingIcons>
          <FaPaperclip className="typing-icon" />
          <MdImageSearch className="typing-icon" />
        </S.TypingIcons>
        <S.TypingButton>
          <MdSend className="send-icon" />
        </S.TypingButton>
      </S.TypingActions>
    </S.TypingContainer>
  )
}
