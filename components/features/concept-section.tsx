import {
    Box,
    Heading,
    Text,
    VStack,
    Container,
} from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'

import { Section, SectionProps } from '#components/section'

// Motion components
const MotionVStack = motion.create(VStack)
const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)
const MotionContainer = motion.create(Container)

// Custom animation variants for more pronounced movement
const flyInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const flyInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export interface ConceptSectionProps extends Omit<SectionProps, 'title' | 'children'> {
    title: string
    description: string
    content: string
    id: string
    index?: number
}

export const ConceptSection = (props: ConceptSectionProps) => {
    const { title, description, content, id, index = 0, ...rest } = props
    const ref = useRef(null)
    // Reduzierter Margin-Wert und amount auf 0.2 gesetzt für frühere Erkennung
    const isInView = useInView(ref, {
        once: true,
        margin: "-100px 0px",
        amount: 0.2 // Nur 20% des Elements müssen sichtbar sein, um Animationen auszulösen
    })

    // Determine animation direction based on index
    const animationVariant = index % 2 === 0 ? flyInLeft : flyInRight;

    const bgColor = 'gray.900'
    const borderColor = 'gray.700'

    return (
        <Section id={id} py={16} {...rest}>
            <MotionContainer
                ref={ref}
                maxW="container.md"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={animationVariant}
                willChange="opacity, transform" // Hilft dem Browser, Rendering zu optimieren
            >
                <MotionVStack
                    spacing={8}
                    align="start"
                    bg={bgColor}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor={borderColor}
                    p={{ base: 6, md: 10 }}
                    boxShadow="xl"
                >
                    <MotionBox>
                        <MotionHeading
                            as="h2"
                            size="xl"
                            mb={3}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            fontFamily="heading"
                        >
                            {title}
                        </MotionHeading>
                        <MotionText
                            fontSize="xl"
                            fontWeight="medium"
                            color="primary.500"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            fontFamily="heading"
                        >
                            {description}
                        </MotionText>
                    </MotionBox>

                    <MotionText
                        whiteSpace="pre-line"
                        fontSize="md"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }} // Schnellere Animation
                        fontFamily="body"
                    >
                        {content}
                    </MotionText>
                </MotionVStack>
            </MotionContainer>
        </Section>
    )
} 