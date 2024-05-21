import styled from 'styled-components'

export const Chat = styled.div`
  width: 100%;
  max-width: 60%;
`

export const ChatHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  background-color: #5d5b8d;
  color: lightgray;
  height: 4rem;
  border-radius: 0 0.5rem 0 0;
`

export const ChatIcons = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 20%;

  .chat-icon {
    font-size: 1rem;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }
`

export const ChatBody = styled.div`
  height: calc(100% - 8rem);
`

export const ChatFooter = styled.footer``
