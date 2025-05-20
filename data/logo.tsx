import { Box, Image } from '@chakra-ui/react'
import * as React from 'react'

export const Logo = (props: any) => {
  const { height = '46px', borderRadius = 'md', boxShadow = 'md', ...rest } = props
  return (
    <Box {...rest}>
      <Image
        src="/static/images/eva-logo-wide-bg.png"
        height={height}
        alt="Erbe von Arda Logo"
        objectFit="contain"
        borderRadius={borderRadius}
        boxShadow={boxShadow}
      />
    </Box>
  )
}
