import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'

import { BackgroundGradient } from '#components/gradients/background-gradient'
import { Section, SectionProps, SectionTitle } from '#components/section'
import { fadeInUp, staggerContainer } from '../../theme/animations'

const MotionBox = motion(Box)
const MotionAccordionItem = motion(AccordionItem)
const MotionHeading = motion(Heading)
const MotionText = motion(Text)

export interface FaqProps extends Omit<SectionProps, 'title'> {
  title: React.ReactNode
  description?: React.ReactNode
  items: Array<{
    question: string
    answer: React.ReactNode
  }>
}

export const Faq: React.FC<FaqProps> = (props) => {
  const { title, description, items, ...rest } = props

  return (
    <Section id="faq" pos="relative" {...rest}>
      <BackgroundGradient height="100%" style={{
        height: '100%',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        position: 'absolute',
        zIndex: '2',
        opacity: '0.3',
        width: '50vw',
        margin: 'auto',
        filter: 'blur(100px)',
      }} display={{ base: 'none', md: 'block' }} />
      <MotionBox
        zIndex="2"
        pos="relative"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <SectionTitle
          title={title}
          description={description}
          align="left"
          pb="4"
        />

        <Accordion
          defaultIndex={[0]}
          allowToggle
          allowMultiple
          bg="whiteAlpha.200"
          p="4"
          borderRadius="md"
          boxShadow="lg"
          reduceMotion={false}
        >
          {items.map((faq, i) => (
            <FaqItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isFirst={i === 0}
              isLast={i === items.length - 1}
              custom={i * 0.1}
            />
          ))}
        </Accordion>
      </MotionBox>
    </Section>
  )
}

export interface FaqItemProps {
  question: string
  answer: React.ReactNode
  isFirst?: boolean
  isLast?: boolean
  custom?: number
}

export const FaqItem: React.FC<FaqItemProps> = (props) => {
  const { question, answer, isFirst, isLast, custom } = props

  return (
    <MotionAccordionItem
      border="0"
      borderBottomWidth={isLast ? 0 : '1px'}
      borderBottomColor="whiteAlpha.200"
      mb={isLast ? 0 : 2}
      borderTopWidth={isFirst ? 0 : undefined}
      variants={fadeInUp}
      custom={custom}
      initial="hidden"
      animate="visible"
      transition={{ delay: custom }}
      whileHover={{ scale: 1.01 }}
    >
      <AccordionButton
        px="6"
        py="4"
        _hover={{ bg: "blackAlpha.300" }}
        transition="all 0.2s ease"
      >
        <Box flex="1" textAlign="left">
          <MotionHeading size="sm">{question}</MotionHeading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        pb={4}
        px="6"
        style={{
          overflow: 'hidden',
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        <MotionText
          style={{
            transition: 'all 0.3s ease-in-out',
            transitionDelay: '0.1s'
          }}
        >
          {answer}
        </MotionText>
      </AccordionPanel>
    </MotionAccordionItem>
  )
}
