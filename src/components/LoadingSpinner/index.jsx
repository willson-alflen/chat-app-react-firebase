import styled, { keyframes } from 'styled-components'

const bubbleAnimation = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
`

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
  height: 100px;
  padding: 10px;
  background-color: #fff;
  border-radius: 0 25px 25px 25px;
  position: relative;
`

const Bubble = styled.div`
  width: 12px;
  height: 12px;
  background-color: #5d5b8d;
  border-radius: 50%;
  animation: ${bubbleAnimation} 1.2s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }

  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`

const ChatBubbleSpinner = () => {
  return (
    <SpinnerContainer>
      <Bubble />
      <Bubble />
      <Bubble />
    </SpinnerContainer>
  )
}

export default ChatBubbleSpinner
