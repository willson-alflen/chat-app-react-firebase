import styled from 'styled-components'

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

export const InputLabel = styled.label`
  &#profile-picture {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    text-align: left;
    margin-top: 1rem;
    cursor: pointer;

    .icon {
      font-size: 2rem;
    }
  }
`

export const Input = styled.input`
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: none;
  border-bottom: 1px solid #a7bcff;

  &#input-file {
    display: none;
  }

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
  transition: background-color 0.2s;

  &:hover {
    background-color: #5f7cd8;
  }
`

export const Login = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.9rem;

  a {
    color: #7b96ec;
  }
`
