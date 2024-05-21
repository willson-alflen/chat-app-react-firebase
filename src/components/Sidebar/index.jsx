import Navbar from '../Navbar'
import SearchBar from '../SearchBar'
import Chats from '../Chats'
import * as S from './styles'

export default function Sidebar() {
  return (
    <S.Sidebar>
      <Navbar />
      <SearchBar />
      <Chats />
    </S.Sidebar>
  )
}
