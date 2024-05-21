import Sidebar from '../../components/Sidebar'
import Chat from '../../components/Chat'
import * as S from './styles'

export default function Home() {
  return (
    <S.ChatContainer>
      <Sidebar />
      <Chat />
    </S.ChatContainer>
  )
}
