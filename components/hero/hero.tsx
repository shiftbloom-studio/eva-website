import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  Image,
} from '@chakra-ui/react'

export interface HeroProps {
  title: React.ReactNode
  description: React.ReactNode
  ctaText?: string
  ctaLink?: string
  image?: string
}

export const Hero: React.FC<HeroProps> = (props) => {
  const { title, description, ctaText, ctaLink, image } = props

  return (
    <Box as="section" pt="12" pb="8">
      <Container maxW="container.xl">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          spacing="12"
          h={{ base: 'auto', lg: '80vh' }}
          mx="auto"
          maxW="container.xl"
        >
          <Box
            flex="1"
            maxW={{ base: 'full', lg: '40rem' }}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            <Heading
              as="h1"
              fontWeight="extrabold"
              size={useBreakpointValue({ base: '3xl', lg: '4xl' })}
              maxW="container.md"
              mx={{ base: 'auto', lg: 0 }}
            >
              {title}
            </Heading>

            <Text
              mt="6"
              fontSize={{ base: 'lg', lg: 'xl' }}
              maxW={{ base: 'md', lg: 'container.md' }}
              mx={{ base: 'auto', lg: 0 }}
            >
              {description}
            </Text>

            {ctaText && ctaLink && (
              <Button
                mt="8"
                colorScheme="primary"
                size="lg"
                as="a"
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ctaText}
              </Button>
            )}
          </Box>

          {image && (
            <Box flex="1" display={{ base: 'none', lg: 'block' }}>
              <Image
                src={image}
                alt="Hero Image"
                objectFit="contain"
                w="full"
                h="full"
                maxH="500px"
              />
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
