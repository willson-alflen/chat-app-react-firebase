import styled from 'styled-components'

export const Chats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 0.5rem;
  height: calc(100% - 164px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #5d5b8d transparent;
`

export const UserChat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #2f2d52;
  }

  .user-icon {
    font-size: 2.5rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }

  div {
    span {
      display: block;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.75rem;
      color: lightgray;
    }
  }
`
