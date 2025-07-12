import {
  Box,
  BoxProps,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link, LinkProps } from '@saas-ui/react'

import siteConfig from '#data/config'

export interface FooterProps extends BoxProps {
  columns?: number
  onImpressumOpen?: () => void
  onPrivacyOpen?: () => void
  onCommunityOpen?: () => void
  onLegalOpen?: () => void
}

export const Footer: React.FC<FooterProps> = (props) => {
  const { columns = 2, onImpressumOpen, onPrivacyOpen, onCommunityOpen, onLegalOpen, ...rest } = props
  return (
    <Box bg="gray.900" _dark={{ bg: 'gray.900' }} {...rest}>
      <Container maxW="container.2xl" px="8" py="8">
        <SimpleGrid columns={columns}>
          <Stack spacing="8">
            <Copyright>{siteConfig.footer.copyright}</Copyright>
          </Stack>
          <HStack justify="flex-end" spacing="4" alignSelf="flex-end">
            {siteConfig.footer?.links?.map(({ id, href, label }) => {
              if (id === 'impressum') {
                return (
                  <FooterLink key={id} onClick={onImpressumOpen} cursor="pointer">
                    {label}
                  </FooterLink>
                )
              }
              if (id === 'datenschutz') {
                return (
                  <FooterLink key={id} onClick={onPrivacyOpen} cursor="pointer">
                    {label}
                  </FooterLink>
                )
              }
              if (id === 'community') {
                return (
                  <FooterLink key={id} onClick={onCommunityOpen} cursor="pointer">
                    {label}
                  </FooterLink>
                )
              }
              if (id === 'legal') {
                return (
                  <FooterLink key={id} onClick={onLegalOpen} cursor="pointer">
                    {label}
                  </FooterLink>
                )
              }
              return (
                <FooterLink key={href} href={href}>
                  {label}
                </FooterLink>
              )
            })}
          </HStack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export interface CopyrightProps {
  title?: React.ReactNode
  children: React.ReactNode
}

export const Copyright: React.FC<CopyrightProps> = ({
  title,
  children,
}: CopyrightProps) => {
  let content
  if (title && !children) {
    content = `&copy; ${new Date().getFullYear()} - ${title}`
  }
  return (
    <Text color="muted" fontSize="sm">
      {content || children}
    </Text>
  )
}

export const FooterLink: React.FC<LinkProps> = (props) => {
  const { children, ...rest } = props
  return (
    <Link
      color="muted"
      fontSize="sm"
      textDecoration="none"
      _hover={{
        color: 'white',
        transition: 'color .2s ease-in',
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}
