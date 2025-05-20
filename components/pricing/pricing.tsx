import {
  Box,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'
import { motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'

import {
  ButtonLink,
  ButtonLinkProps,
} from '#components/button-link/button-link'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import { Section, SectionProps, SectionTitle } from '#components/section'
import { fadeInUp, cardHover, staggerContainer } from '../../theme/animations'

// Motion components
const MotionBox = motion(Box)
const MotionVStack = motion(VStack)
const MotionSimpleGrid = motion(SimpleGrid)
const MotionHStack = motion(HStack)
const MotionIcon = motion(Icon)
const MotionHeading = motion(Heading)
const MotionText = motion(Text)

export interface PricingPlan {
  id: string
  title: React.ReactNode
  description: React.ReactNode
  price: React.ReactNode
  features: Array<PricingFeatureProps | null>
  action: ButtonLinkProps & { label?: string }
  isRecommended?: boolean
}

export interface PricingProps extends SectionProps {
  description: React.ReactNode
  plans: Array<PricingPlan>
}

export const Pricing: React.FC<PricingProps> = (props) => {
  const { children, plans, title, description, ...rest } = props
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <Section id="pricing" pos="relative" {...rest}>
      <BackgroundGradient height="100%" />
      <MotionBox
        ref={ref}
        zIndex="2"
        pos="relative"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <SectionTitle title={title} description={description}></SectionTitle>

        <MotionSimpleGrid
          columns={[1, null, 3]}
          spacing={4}
          variants={staggerContainer}
        >
          {plans?.map((plan, index) => (
            <MotionBox
              key={plan.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              whileHover="hover"
              initial="initial"
            >
              <PricingBox
                title={plan.title}
                description={plan.description}
                price={plan.price}
                variants={cardHover}
                sx={
                  plan.isRecommended
                    ? {
                      borderColor: 'primary.500',
                      _dark: {
                        borderColor: 'primary.500',
                        bg: 'blackAlpha.300',
                      },
                    }
                    : {}
                }
              >
                <PricingFeatures>
                  {plan.features.map((feature, i) =>
                    feature ? (
                      <PricingFeature key={i} {...feature} delay={i * 0.05} />
                    ) : (
                      <br key={i} />
                    ),
                  )}
                </PricingFeatures>
                <ButtonLink
                  colorScheme="primary"
                  {...plan.action}
                  as={motion.a}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  {plan.action.label || 'Sign Up'}
                </ButtonLink>
              </PricingBox>
            </MotionBox>
          ))}
        </MotionSimpleGrid>

        {children}
      </MotionBox>
    </Section>
  )
}

const PricingFeatures: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <MotionVStack
      align="stretch"
      justifyContent="stretch"
      spacing="4"
      mb="8"
      flex="1"
      variants={staggerContainer}
    >
      {children}
    </MotionVStack>
  )
}

export interface PricingFeatureProps {
  title: React.ReactNode
  iconColor?: string
  delay?: number
}

const PricingFeature: React.FC<PricingFeatureProps> = (props) => {
  const { title, iconColor = 'primary.500', delay = 0 } = props
  return (
    <MotionHStack
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      <MotionIcon
        as={FiCheck}
        color={iconColor}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 0.2, type: "spring" }}
      />
      <MotionText
        flex="1"
        fontSize="sm"
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay + 0.3 }}
      >
        {title}
      </MotionText>
    </MotionHStack>
  )
}

export interface PricingBoxProps extends Omit<StackProps, 'title'> {
  title: React.ReactNode
  description: React.ReactNode
  price: React.ReactNode
  variants?: any
}

const PricingBox: React.FC<PricingBoxProps> = (props) => {
  const { title, description, price, children, variants, ...rest } = props
  return (
    <MotionVStack
      zIndex="2"
      bg="whiteAlpha.600"
      borderRadius="md"
      p="8"
      flex="1 0"
      alignItems="stretch"
      border="1px solid"
      borderColor="gray.400"
      _dark={{
        bg: 'blackAlpha.300',
        borderColor: 'gray.800',
      }}
      transition={{ duration: 0.5 }}
      variants={variants}
      {...rest}
    >
      <MotionHeading
        as="h3"
        size="md"
        fontWeight="bold"
        fontSize="lg"
        mb="2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </MotionHeading>
      <MotionBox
        color="muted"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {description}
      </MotionBox>
      <MotionBox
        fontSize="2xl"
        fontWeight="bold"
        py="4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        {price}
      </MotionBox>
      <MotionVStack
        align="stretch"
        justifyContent="stretch"
        spacing="4"
        flex="1"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {children}
      </MotionVStack>
    </MotionVStack>
  )
}
