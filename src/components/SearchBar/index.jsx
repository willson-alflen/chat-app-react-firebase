import * as S from './styles'
import { FaCircleUser } from 'react-icons/fa6'

export default function SearchBar() {
  return (
    <S.SearchBar>
      <S.SearchInput type="text" placeholder="Search" />

      <S.UserChat>
        <FaCircleUser className="user-icon" />
        <span>John Doe</span>
      </S.UserChat>
    </S.SearchBar>
  )
}
