import { Box, BoxProps, useToken } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const animatedGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const AnimatedBox = styled(Box)`
  animation: ${animatedGradient} 20s ease infinite;
  will-change: background-position;
  transform: translate3d(0, 0, 0);
`

export const BackgroundGradient = (props: BoxProps) => {
  const [primary600, primary400, secondary600, gray800] = useToken('colors', [
    'primary.600',
    'primary.400',
    'secondary.600',
    'gray.800'
  ])

  return (
    <AnimatedBox
      position="absolute"
      height="100%"
      width="100%"
      top="0"
      left="0"
      backgroundSize="200% 200%"
      backgroundImage={`linear-gradient(130deg, ${gray800} 0%, ${primary600} 40%, ${secondary600} 60%, ${primary400} 80%)`}
      opacity="0.3"
      style={{
        filter: 'blur(80px)',
        overflow: 'hidden',
        maxWidth: '100vw',
        backfaceVisibility: 'hidden',
      }}
      {...props}
    />
  )
}
