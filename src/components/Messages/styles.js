import styled from 'styled-components'

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #ddddf7;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #5d5b8d #ddddf7;
`

export const NoMessages = styled.p`
  color: #5d5b8d;
  text-align: center;
`
