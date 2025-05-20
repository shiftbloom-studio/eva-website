import * as React from 'react'
import {
  Box,
  Stack,
  VStack,
  SimpleGrid,
  Heading,
  Text,
  Icon,
  Circle,
  ResponsiveValue,
  useMultiStyleConfig,
  ThemingProps,
  SystemProps,
} from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import { Section, SectionTitle, SectionTitleProps } from 'components/section'
import { fadeInUp, cardHover, staggerContainer } from '../../theme/animations'

const MotionBox = motion.create(Box)
const MotionStack = motion.create(Stack)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)
const MotionCircle = motion.create(Circle)
const MotionSimpleGrid = motion.create(SimpleGrid)

const Revealer = ({ children, delay = 0 }: any) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      custom={delay}
      transition={{ delay: delay * 0.2 }}
    >
      {children}
    </MotionBox>
  )
}

export interface FeaturesProps
  extends Omit<SectionTitleProps, 'title' | 'variant'>,
  ThemingProps<'Features'> {
  title?: React.ReactNode
  description?: React.ReactNode
  features: Array<FeatureProps>
  columns?: ResponsiveValue<number>
  spacing?: string | number
  aside?: React.ReactNode
  reveal?: React.FC<any>
  iconSize?: SystemProps['boxSize']
  innerWidth?: SystemProps['maxW']
}

export interface FeatureProps {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: any
  iconPosition?: 'left' | 'top'
  iconSize?: SystemProps['boxSize']
  ip?: 'left' | 'top'
  variant?: string
  delay?: number
}

export const Feature: React.FC<FeatureProps> = (props) => {
  const {
    title,
    description,
    icon,
    iconPosition,
    iconSize = 8,
    ip,
    variant,
  } = props
  const styles = useMultiStyleConfig('Feature', { variant })

  const pos = iconPosition || ip
  const direction = pos === 'left' ? 'row' : 'column'

  return (
    <MotionStack
      sx={styles.container}
      direction={direction}
      whileHover="hover"
      variants={cardHover}
    >
      {icon && (
        <MotionCircle
          sx={styles.icon}
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon as={icon} boxSize={iconSize} />
        </MotionCircle>
      )}
      <Box>
        <MotionHeading
          sx={styles.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </MotionHeading>
        <MotionText
          sx={styles.description}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {description}
        </MotionText>
      </Box>
    </MotionStack>
  )
}

export const Features: React.FC<FeaturesProps> = (props) => {
  const {
    title,
    description,
    features,
    columns = [1, 2, 3],
    spacing = 8,
    align: alignProp = 'center',
    iconSize = 8,
    aside,
    reveal: WrapComponent = Revealer,
    ...rest
  } = props
  const align = !!aside ? 'left' : alignProp
  const ip = align === 'left' ? 'left' : 'top'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <Section {...rest}>
      <MotionStack
        ref={ref}
        direction="row"
        height="full"
        align="flex-start"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <VStack flex="1" spacing={[4, null, 8]} alignItems="stretch">
          {(title || description) && (
            <WrapComponent>
              <SectionTitle
                title={title}
                description={description}
                align={align}
              />
            </WrapComponent>
          )}
          <MotionSimpleGrid
            columns={columns}
            spacing={spacing}
            variants={staggerContainer}
          >
            {features.map((feature, i) => {
              return (
                <WrapComponent key={i} delay={i * 0.1}>
                  <Feature iconSize={iconSize} {...feature} ip={ip} />
                </WrapComponent>
              )
            })}
          </MotionSimpleGrid>
        </VStack>
        {aside && (
          <MotionBox
            flex="1"
            p="8"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            {aside}
          </MotionBox>
        )}
      </MotionStack>
    </Section>
  )
}
