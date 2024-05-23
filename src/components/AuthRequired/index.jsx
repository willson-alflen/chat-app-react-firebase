import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner'

export default function AuthRequired() {
  const { user, isLoading } = useContext(UserContext)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ message: 'Please log in to use the chat!' }}
        replace
      />
    )
  }

  return <Outlet />
}
