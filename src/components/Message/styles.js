import styled from 'styled-components'

export const Message = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: ${({ $isCurrentUser }) =>
    $isCurrentUser ? 'flex-end' : 'flex-start'};
  gap: 1.5rem;
`

export const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  order: ${({ $isCurrentUser }) => ($isCurrentUser ? 2 : 1)};

  .user-icon {
    font-size: 2.5rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    align-self: ${({ $isCurrentUser }) => ($isCurrentUser ? 'end' : 'start')};
  }

  span {
    color: gray;
    font-size: 0.75rem;
  }
`

export const MessageContent = styled.div`
  background-color: ${({ $isCurrentUser }) =>
    $isCurrentUser ? '#5d5b8d' : '#ffffff'};
  color: ${({ $isCurrentUser }) => ($isCurrentUser ? '#ffffff' : '#2f2d52')};
  padding: 10px 20px;
  border-radius: ${({ $isCurrentUser }) =>
    $isCurrentUser ? '0.5rem 0 0.5rem 0.5rem' : '0 0.5rem 0.5rem 0.5rem'};
  max-width: 85%;
  width: fit-content;
  order: ${({ $isCurrentUser }) => ($isCurrentUser ? 1 : 2)};
`

export const MessageText = styled.p`
  margin-bottom: 0.5rem;
`

export const MessageImage = styled.img`
  max-width: 75%;
  border-radius: 0.5rem;
  cursor: pointer;
`
