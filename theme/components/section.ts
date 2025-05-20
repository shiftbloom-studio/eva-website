const Section = {
  baseStyle: {
    pt: 28,
    pb: 28,
    px: [4, null],
  },
  variants: {
    subtle: {},
    solid: {
      bg: 'primary.400',
    },
    alternate: {
      bg: 'gray.800',
    },
  },
  defaultProps: {
    variant: 'subtle',
  },
}

export default Section
