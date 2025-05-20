import {
    Box,
    Heading,
    Text,
    VStack,
    Container,
} from '@chakra-ui/react'
import React from 'react'

import { Section, SectionProps } from '#components/section'

export interface ConceptSectionProps extends Omit<SectionProps, 'title' | 'children'> {
    title: string
    description: string
    content: string
    id: string
}

export const ConceptSection = (props: ConceptSectionProps) => {
    const { title, description, content, id, ...rest } = props

    const bgColor = 'gray.900'
    const borderColor = 'gray.700'

    return (
        <Section id={id} py={16} {...rest}>
            <Container maxW="container.lg">
                <VStack
                    spacing={8}
                    align="start"
                    bg={bgColor}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor={borderColor}
                    p={{ base: 6, md: 10 }}
                    boxShadow="xl"
                >
                    <Box>
                        <Heading as="h2" size="xl" mb={3}>
                            {title}
                        </Heading>
                        <Text fontSize="xl" fontWeight="medium" color="primary.500">
                            {description}
                        </Text>
                    </Box>

                    <Text whiteSpace="pre-line" fontSize="md">
                        {content}
                    </Text>
                </VStack>
            </Container>
        </Section>
    )
} 