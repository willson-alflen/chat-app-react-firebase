import styled from 'styled-components'

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2f2d52;
  padding: 1rem 0.5rem;
  height: 4rem;
  border-radius: 0.5rem 0 0 0;
`

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .user-icon {
    font-size: 1.5rem;
  }

  button {
    background-color: #5d5b8d;
    color: #ddddf7;
    font-size: 0.75rem;
    border: none;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }
`
