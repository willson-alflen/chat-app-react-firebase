import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../db/firebase'
import { UserContext } from '../../context/UserContext'
import LoadingSpinner from '../../components/LoadingSpinner'
import { toast } from 'react-toastify'
import * as S from './styles'

export default function Login() {
  const { user, dispatch, isLoading } = useContext(UserContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loginStatus, setLoginStatus] = useState('idle')
  const [isFormVisible, setIsFormVisible] = useState(true)
  const [showAlreadyLoggedInMessage, setShowAlreadyLoggedInMessage] =
    useState(false)

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoginStatus('Submitting')

    loginUser(formData)
      .then((user) => {
        if (user) {
          dispatch({ type: 'LOGIN', user: user })
          toast.success(`You are now logged in!`)
          navigate('/')
        } else {
          toast.error('User not found')
        }
      })
      .catch((error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setLoginStatus('idle')
        setFormData({ email: '', password: '' })
      })
  }

  useEffect(() => {
    if (user && !showAlreadyLoggedInMessage) {
      toast.success('You are already logged in')
      setIsFormVisible(false)
      setShowAlreadyLoggedInMessage(true)
    }
  }, [user, showAlreadyLoggedInMessage])

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <S.FormWrapper>
      {isFormVisible ? (
        <>
          <S.FormTitle>Log in to your account</S.FormTitle>
          <S.Form onSubmit={handleFormSubmit}>
            <S.InputLabel htmlFor="email">
              <S.Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </S.InputLabel>

            <S.InputLabel htmlFor="password">
              <S.Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleFormChange}
              />
            </S.InputLabel>

            <S.Button
              type="submit"
              disabled={
                !formData.email ||
                !formData.password ||
                loginStatus === 'Submitting'
              }
            >
              {loginStatus === 'Submitting' ? 'Logging in...' : 'Log in'}
            </S.Button>
            <S.Signup>
              Don&apos;t have an account? <Link to="/signup">Register</Link>
            </S.Signup>
          </S.Form>
        </>
      ) : (
        showAlreadyLoggedInMessage && (
          <S.AlreadyLoggedInMessage>
            <p>
              You are already logged in.
              <span>
                Go to your <Link to="/">home page</Link>.
              </span>
            </p>
          </S.AlreadyLoggedInMessage>
        )
      )}
    </S.FormWrapper>
  )
}
