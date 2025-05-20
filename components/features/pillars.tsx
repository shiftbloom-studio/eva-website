import {
    Box,
    Heading,
    SimpleGrid,
    Text,
    VStack,
    Image,
    Center,
    useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

import { Section, SectionProps, SectionTitle } from '#components/section'

export interface Pillar {
    title: string
    description: string
    image: string
}

export interface PillarsProps extends SectionProps {
    title: React.ReactNode
    description?: React.ReactNode
    items: Array<Pillar>
}

export const Pillars = (props: PillarsProps) => {
    const { title, description, items, ...rest } = props

    const bgColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.400')
    const borderColor = useColorModeValue('gray.200', 'gray.700')

    return (
        <Section id="pillars" {...rest}>
            <SectionTitle title={title} description={description} />

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={10}>
                {items.map((pillar, index) => (
                    <VStack
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
                    >
                        <Center
                            borderRadius="full"
                            overflow="hidden"
                            boxSize="150px"
                            mb={4}
                        >
                            <Image
                                src={pillar.image}
                                alt={pillar.title}
                                objectFit="cover"
                                width="100%"
                                height="100%"
                            />
                        </Center>
                        <Heading size="md" fontWeight="bold">
                            {pillar.title}
                        </Heading>
                        <Text>{pillar.description}</Text>
                    </VStack>
                ))}
            </SimpleGrid>
        </Section>
    )
} 