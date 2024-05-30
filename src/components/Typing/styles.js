import styled from 'styled-components'

export const TypingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.5rem;
  height: 4rem;
  padding: 0.5rem;
  background-color: #ffffff;
  border-top: 1px solid #ddddf7;
`

export const TypingArea = styled.textarea`
  background-color: transparent;
  border: none;
  outline: none;
  width: calc(80% - 0.25rem);
  color: #2f2d52;
  font-size: 1rem;
  resize: none;
  scrollbar-width: thin;
  scrollbar-color: #ddddf7 transparent;

  &::placeholder {
    color: lightgray;
  }
`

export const TypingActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: calc(20% - 0.25rem);
  justify-content: flex-end;
`

export const TypingIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .typing-icon {
    font-size: 1rem;
    color: #5d5b8d;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #2f2d52;
    }
  }
`

export const TypingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5d5b8d;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  padding: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2f2d52;
  }

  .send-icon {
    font-size: 1rem;
  }
`
