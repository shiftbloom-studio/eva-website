import { Box, Image } from '@chakra-ui/react'
import * as React from 'react'

export const Logo = (props: any) => {
  const { height = '32px', ...rest } = props
  return (
    <Box {...rest}>
      <Image
        src="/static/images/eva-logo-wide-bg.png"
        height={height}
        alt="Erbe von Arda Logo"
        objectFit="contain"
      />
    </Box>
  )
}
