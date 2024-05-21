import styled from 'styled-components'

export const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`

export const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .user-icon {
    font-size: 2rem;
  }

  span {
    color: gray;
    font-size: 0.75rem;
  }
`

export const MessageContent = styled.div`
  background-color: white;
  color: #2f2d52;
  padding: 10px 20px;
  border-radius: 0px 10px 10px 10px;
  max-width: 85%;
  width: fit-content;
`

export const MessageText = styled.p`
  margin-bottom: 0.5rem;
`

export const MessageImage = styled.img`
  max-width: 75%;
  border-radius: 0.5rem;
  cursor: pointer;
`
