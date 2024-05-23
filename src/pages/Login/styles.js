import styled, { keyframes } from 'styled-components'

export const FormWrapper = styled.div`
  background-color: #fff;
  color: #7b96ec;
  border-radius: 8px;
  padding: 2rem 3rem;
  width: 600px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`

export const FormTitle = styled.h1`
  margin-bottom: 1.5rem;
`

export const Form = styled.form`
  display: grid;
  gap: 1rem;
`

export const InputLabel = styled.label``

export const Input = styled.input`
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: none;
  border-bottom: 1px solid #a7bcff;

  &::placeholder {
    color: rgb(175, 175, 175);
    font-family: inherit;
    font-size: 1rem;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid #7b96ec;
  }
`

export const Button = styled.button`
  width: 80%;
  margin: 3rem auto 0;
  background-color: #7b96ec;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: background-color 0.2s;

  &:hover {
    background-color: #5f7cd8;
  }
`

export const Signup = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.9rem;

  a {
    color: #7b96ec;
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const AlreadyLoggedInMessage = styled.div`
  width: fit-content;
  margin: 4rem auto;
  background-color: #7b96ec;
  color: white;
  padding: 1.5rem;
  border-radius: 0 25px 25px 25px;
  animation: ${fadeIn} 1s ease-in-out;

  span {
    display: block;

    a {
      text-decoration: underline;
      transition: color 0.2s;

      &:hover {
        color: #3e3c61;
      }
    }
  }
`
