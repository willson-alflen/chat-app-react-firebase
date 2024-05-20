import { Link } from 'react-router-dom'
import * as S from './styles'

export default function Login() {
  return (
    <S.FormWrapper>
      <S.FormTitle>Log in to your account</S.FormTitle>
      <S.Form>
        <S.InputLabel htmlFor="email">
          <S.Input type="email" id="email" placeholder="Email" />
        </S.InputLabel>

        <S.InputLabel htmlFor="password">
          <S.Input type="password" id="email" placeholder="Password" />
        </S.InputLabel>

        <S.Button>Log in</S.Button>
        <S.Signup>
          Don&apos;t have an account? <Link href="/signup">Register</Link>
        </S.Signup>
      </S.Form>
    </S.FormWrapper>
  )
}
