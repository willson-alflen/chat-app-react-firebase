import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import Chat from '../../components/Chat'
import LoadingSpinner from '../../components/LoadingSpinner'
import * as S from './styles'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <S.ChatContainer>
      <Sidebar />
      <Chat />
    </S.ChatContainer>
  )
}
