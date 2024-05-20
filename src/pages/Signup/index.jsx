import { Link } from 'react-router-dom'
import * as S from './styles'
import { MdImageSearch } from 'react-icons/md'

export default function Signup() {
  return (
    <S.FormWrapper>
      <S.FormTitle>Sign up for an account</S.FormTitle>
      <S.Form>
        <S.InputLabel htmlFor="name">
          <S.Input type="text" id="name" placeholder="Full name" />
        </S.InputLabel>

        <S.InputLabel htmlFor="email">
          <S.Input type="email" id="email" placeholder="Email" />
        </S.InputLabel>

        <S.InputLabel htmlFor="password">
          <S.Input type="password" id="password" placeholder="Password" />
        </S.InputLabel>

        <S.InputLabel htmlFor="confirmPassword">
          <S.Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
          />
        </S.InputLabel>

        <S.InputLabel htmlFor="input-file" id="profile-picture">
          <MdImageSearch className="icon" />
          Upload your profile picture
          <S.Input type="file" id="input-file" />
        </S.InputLabel>

        <S.Button>Sign up</S.Button>
        <S.Login>
          Already have an account? <Link href="/login">Log in</Link>
        </S.Login>
      </S.Form>
    </S.FormWrapper>
  )
}
