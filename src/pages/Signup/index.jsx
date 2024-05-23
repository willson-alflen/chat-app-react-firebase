import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../db/firebase'
import { toast } from 'react-toastify'
import * as S from './styles'
import { MdImageSearch } from 'react-icons/md'

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    imageURL: '',
  })
  const [signupStatus, setSignupStatus] = useState('idle')
  const [isReadingFile, setIsReadingFile] = useState(false)

  const handleFormChange = (e) => {
    if (e.target.type === 'file') {
      const file = e.target.files[0]
      const reader = new FileReader()

      setIsReadingFile(true)

      reader.onload = () => {
        setFormData({ ...formData, imageURL: reader.result })
        setIsReadingFile(false)
      }
      reader.readAsDataURL(file)
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setSignupStatus('Submitting')

    try {
      const user = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        imageURL: formData.imageURL,
      })

      if (user) {
        toast.success('User created successfully')
        navigate('/login')
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          imageURL: '',
        })
        setSignupStatus('idle')
      } else {
        toast.error('An error occurred. Please try again.')
      }
    } catch (error) {
      toast.error(error.message)
      setSignupStatus('idle')
    }
  }

  return (
    <S.FormWrapper>
      <S.FormTitle>Sign up for an account</S.FormTitle>
      <S.Form onSubmit={handleFormSubmit}>
        <S.InputLabel htmlFor="name">
          <S.Input
            type="text"
            id="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleFormChange}
          />
        </S.InputLabel>

        <S.InputLabel htmlFor="email">
          <S.Input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormChange}
          />
        </S.InputLabel>

        <S.InputLabel htmlFor="password">
          <S.Input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleFormChange}
          />
        </S.InputLabel>

        <S.InputLabel htmlFor="confirmPassword">
          <S.Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleFormChange}
          />
        </S.InputLabel>

        <S.InputLabel htmlFor="input-file" id="profile-picture">
          <MdImageSearch className="icon" />
          Upload your profile picture
          <S.Input
            type="file"
            id="input-file"
            value={formData.imageURL}
            onChange={handleFormChange}
          />
        </S.InputLabel>

        <S.Button type="submit" disabled={isReadingFile}>
          {signupStatus === 'Submitting' ? 'Signing up...' : 'Sign up'}
        </S.Button>
        <S.Login>
          Already have an account? <Link to="/login">Log in</Link>
        </S.Login>
      </S.Form>
    </S.FormWrapper>
  )
}
