import {
    Box,
    Heading,
    SimpleGrid,
    Text,
    VStack,
    Image,
    Center,
} from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'

import { Section, SectionProps, SectionTitle } from '#components/section'

// Simple fade in animation without horizontal movement
const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: 'easeOut'
        }
    }
};

// Motion components
const MotionVStack = motion(VStack)
const MotionHeading = motion(Heading)
const MotionText = motion(Text)
const MotionCenter = motion(Center)
const MotionSimpleGrid = motion(SimpleGrid)

export interface Pillar {
    title: string
    description: string
    image: string
}

export interface PillarsProps {
    title: string
    description?: string
    items: Array<Pillar>
}

export const Pillars = (props: PillarsProps) => {
    const { title, description, items, ...rest } = props
    const ref = useRef(null)
    const isInView = useInView(ref, {
        once: true,
        margin: "-100px 0px",
        amount: 0.2
    })

    const bgColor = 'blackAlpha.400'
    const borderColor = 'gray.700'

    return (
        <Section id="pillars" {...rest}>
            <SectionTitle title={title} description={description} />

            <MotionSimpleGrid
                ref={ref}
                columns={{ base: 1, md: 3 }}
                spacing={10}
                mt={10}
                willChange="opacity"
            >
                {items.map((pillar, index) => {
                    return (
                        <MotionVStack
                            key={index}
                            spacing={6}
                            bg={bgColor}
                            borderRadius="lg"
                            borderWidth="1px"
                            borderColor={borderColor}
                            p={6}
                            height="100%"
                            align="center"
                            textAlign="center"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={fadeIn}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                            willChange="opacity, transform"
                        >
                            <MotionCenter
                                borderRadius="full"
                                overflow="hidden"
                                boxSize="150px"
                                mb={4}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: index * 0.1 + 0.1, duration: 0.3 }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                willChange="opacity, transform"
                            >
                                <Image
                                    src={pillar.image}
                                    alt={pillar.title}
                                    objectFit="cover"
                                    width="100%"
                                    height="100%"
                                    loading="eager"
                                />
                            </MotionCenter>
                            <MotionHeading
                                size="md"
                                fontWeight="bold"
                                fontFamily="heading"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                            >
                                {pillar.title}
                            </MotionHeading>
                            <MotionText
                                fontFamily="body"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                            >
                                {pillar.description}
                            </MotionText>
                        </MotionVStack>
                    );
                })}
            </MotionSimpleGrid>
        </Section>
    )
} 