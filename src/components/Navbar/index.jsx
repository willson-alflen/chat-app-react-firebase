import * as S from './styles'
import { FaCircleUser } from 'react-icons/fa6'

export default function Navbar() {
  return (
    <S.Navbar>
      <h1>Chat App</h1>
      <S.User>
        <FaCircleUser className="user-icon" />
        <span>John Doe</span>
        <button>logout</button>
      </S.User>
    </S.Navbar>
  )
}
