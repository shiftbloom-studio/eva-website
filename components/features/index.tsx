import {
    Container,
    GridItem,
    Heading,
    Icon,
    SimpleGrid,
    Text,
    VStack,
    Box,
} from '@chakra-ui/react'

import React from 'react'

import { BackgroundGradient } from '#components/gradients/background-gradient'
import { Section, SectionProps, SectionTitle } from '#components/section'

export interface FeaturesProps extends SectionProps {
    title: React.ReactNode
    description?: React.ReactNode
    items: Array<{
        title: string
        description: string
        icon: React.ElementType
    }>
}

export const Features = (props: FeaturesProps) => {
    const { title, description, items, ...rest } = props

    return (
        <Section id="features" pos="relative" {...rest}>
            <BackgroundGradient zIndex="-1" />
            <Box zIndex="1" position="relative">
                <SectionTitle
                    title={title}
                    description={description}
                    pb={{ base: '4', md: '8' }}
                />

                <Container maxW="container.xl" pt="4">
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 10, md: 14 }}>
                        {items?.map((feature, i) => (
                            <GridItem key={i}>
                                <VStack spacing="6" align="flex-start">
                                    <Box
                                        bg="primary.500"
                                        color="white"
                                        p="3"
                                        borderRadius="full"
                                    >
                                        <Icon
                                            as={feature.icon}
                                            boxSize={{ base: '5', md: '6' }}
                                        />
                                    </Box>
                                    <Heading size="md">{feature.title}</Heading>
                                    <Text color="muted">{feature.description}</Text>
                                </VStack>
                            </GridItem>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>
        </Section>
    )
} 