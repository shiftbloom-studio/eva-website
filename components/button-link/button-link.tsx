import { Button, ButtonProps } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'

export interface ButtonLinkProps extends ButtonProps {
  href: LinkProps['href']
  isExternal?: boolean
}

export const ButtonLink = ({
  href,
  isExternal,
  children,
  ...buttonProps
}: ButtonLinkProps) => {
  const defaultProps = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    _hover: {
      color: 'white',
    },
  }

  // If it's primary, use the primary color and its hover state
  const primaryProps =
    buttonProps.colorScheme === 'primary'
      ? {
        bg: 'primary.500',
        _hover: {
          bg: 'primary.600',
          color: 'white',
        },
      }
      : {}

  if (isExternal) {
    return (
      <Button
        as="a"
        href={href.toString()}
        target="_blank"
        rel="noopener noreferrer"
        {...defaultProps}
        {...primaryProps}
        {...buttonProps}
      >
        {children}
      </Button>
    )
  }

  return (
    <Button
      as={Link}
      href={href}
      {...defaultProps}
      {...primaryProps}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}
