import styled from 'styled-components'

export const SearchBar = styled.div`
  display: grid;
  gap: 0.75rem;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid gray;
`

export const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  color: white;
  outline: none;

  &::placeholder {
    color: lightgray;
  }
`

export const UserChat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #2f2d52;
  }

  .user-icon {
    font-size: 1.5rem;
  }
`
