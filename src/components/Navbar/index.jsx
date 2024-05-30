import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { logoutUser } from '../../db/firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as S from './styles'
import { FaCircleUser } from 'react-icons/fa6'

export default function Navbar() {
  const { user, dispatch } = useContext(UserContext)
  const navigate = useNavigate()

  const handleUserLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logoutUser()
        .then(() => {
          dispatch({ type: 'LOGOUT' })
          navigate('/login')
          toast.success('User logged out successfully')
        })
        .catch((error) => {
          toast.error(error.message)
        })
    }
  }

  return (
    <S.Navbar>
      <h1>Chat App</h1>
      <S.User>
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            style={{ width: '2rem', height: '2rem', borderRadius: '50%' }}
          />
        ) : (
          <FaCircleUser className="user-icon" />
        )}
        <span>{user.displayName}</span>
        <button onClick={handleUserLogout}>logout</button>
      </S.User>
    </S.Navbar>
  )
}
