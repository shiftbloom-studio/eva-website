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

import React from 'react'

import { BackgroundGradient } from '#components/gradients/background-gradient'
import { Section, SectionProps, SectionTitle } from '#components/section'

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
      }} />
      <Box zIndex="2" pos="relative">
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
        >
          {items.map((faq, i) => (
            <FaqItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isFirst={i === 0}
              isLast={i === items.length - 1}
            />
          ))}
        </Accordion>
      </Box>
    </Section>
  )
}

export interface FaqItemProps {
  question: string
  answer: React.ReactNode
  isFirst?: boolean
  isLast?: boolean
}

export const FaqItem: React.FC<FaqItemProps> = (props) => {
  const { question, answer, isFirst, isLast } = props

  return (
    <AccordionItem
      border="0"
      borderBottomWidth={isLast ? 0 : '1px'}
      borderBottomColor="whiteAlpha.200"
      mb={isLast ? 0 : 2}
      borderTopWidth={isFirst ? 0 : undefined}
    >
      <AccordionButton px="6" py="4" _hover={{ bg: 'blackAlpha.300' }}>
        <Box flex="1" textAlign="left">
          <Heading size="sm">{question}</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} px="6">
        <Text>{answer}</Text>
      </AccordionPanel>
    </AccordionItem>
  )
}
