import {
  chakra,
  useStyleConfig,
  omitThemingProps,
  Container,
  ThemingProps,
  StyleProps,
  HTMLChakraProps,
  ContainerProps,
} from '@chakra-ui/react'
import React from 'react'

export interface SectionProps
  extends HTMLChakraProps<'div'>,
  ThemingProps<'Section'> {
  children?: React.ReactNode
  innerWidth?: StyleProps['width']
}

export const Section = ({ children, innerWidth = 'container.lg', className, ...rest }: SectionProps) => {
  const styles = useStyleConfig('Section', rest)

  const ownProps = omitThemingProps(rest)

  return (
    <chakra.div __css={styles} {...ownProps}>
      <Container height="full" maxW={innerWidth}>
        {children}
      </Container>
    </chakra.div>
  )
}
