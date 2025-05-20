import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  Image,
  HStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { fadeInLeft, fadeInRight, fadeInUp, floating } from '../../theme/animations'

// Create motion variants of Chakra components
const MotionBox = motion(Box)
const MotionHeading = motion(Heading)
const MotionText = motion(Text)
const MotionStack = motion(Stack)
const MotionImage = motion(Image)

export interface HeroProps {
  title: React.ReactNode
  description: React.ReactNode
  ctaText?: string
  ctaLink?: string
  cta2Text?: string
  cta2Link?: string
  image?: string
}

export const Hero: React.FC<HeroProps> = (props) => {
  const { title, description, ctaText, ctaLink, cta2Text, cta2Link, image } = props

  return (
    <Box as="section" pt="12" pb="8">
      <Container maxW="container.xl">
        <MotionStack
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          spacing="12"
          h={{ base: 'auto', lg: '80vh' }}
          mx="auto"
          maxW="container.xl"
          initial="hidden"
          animate="visible"
          variants={floating}
        >
          <MotionBox
            flex="1"
            maxW={{ base: 'full', lg: '40rem' }}
            textAlign={{ base: 'center', lg: 'left' }}
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            <MotionHeading
              as="h1"
              fontWeight="extrabold"
              size={useBreakpointValue({ base: '3xl', lg: '4xl' })}
              maxW="container.md"
              mx={{ base: 'auto', lg: 0 }}
              variants={fadeInUp}
            >
              {title}
            </MotionHeading>

            <MotionText
              mt="10"
              fontSize={{ base: 'lg', lg: 'xl' }}
              maxW={{ base: 'md', lg: 'container.md' }}
              mx={{ base: 'auto', lg: 0 }}
              variants={fadeInUp}
            >
              {description}
            </MotionText>

            {ctaText && ctaLink && (
              <MotionBox variants={fadeInUp}>
                <HStack spacing="8" mt="10" justifyContent={{ base: 'center', lg: 'left' }} alignItems="center">
                  <Button
                    mt="4"
                    colorScheme="primary"
                    size="lg"
                    as={motion.a}
                    href={ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {ctaText}
                  </Button>
                  {cta2Text && cta2Link && (
                    <Button
                      mt="4"
                      colorScheme="secondary"
                      size="lg"
                      as={motion.a}
                      href={cta2Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {cta2Text}
                    </Button>
                  )}
                </HStack>
              </MotionBox>
            )}
          </MotionBox>

          {image && (
            <MotionBox
              flex="1"
              display={{ base: 'none', lg: 'block' }}
              position="relative"
              textAlign="right"
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
            >
              <Box
                position="relative"
                width="95%"
                height="475px"
                maxH="475px"
                marginLeft="auto"
              >
                <MotionImage
                  src={image}
                  alt="Hero Image"
                  objectFit="contain"
                  w="105%"
                  h="500px"
                  maxH="525px"
                  position="absolute"
                  right="0"
                  top="50%"
                  style={{ translateY: '-50%' }}
                  variants={floating}
                  animate="animate"
                />
              </Box>
            </MotionBox>
          )}
        </MotionStack>
      </Container>
    </Box>
  )
}
