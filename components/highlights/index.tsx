import {
    Box,
    Container,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react'
import React from 'react'

export interface HighlightsProps {
    title: React.ReactNode
    description?: React.ReactNode
    items: Array<{
        title: string
        description: string
        icon: React.ElementType
    }>
}

export const Highlights = (props: HighlightsProps) => {
    const { title, description, items } = props

    return (
        <Box id="highlights">
            <VStack spacing="4" mb="8" textAlign="center">
                <Heading as="h2" size="xl">
                    {title}
                </Heading>
                {description && (
                    <Text fontSize="lg" maxW="container.md" mx="auto">
                        {description}
                    </Text>
                )}
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="10">
                {items.map((item, i) => (
                    <VStack
                        key={i}
                        align="center"
                        textAlign="center"
                        bg="whiteAlpha.200"
                        borderRadius="lg"
                        p="6"
                        boxShadow="md"
                        height="100%"
                        _hover={{
                            transform: 'translateY(-5px)',
                            boxShadow: 'xl',
                            transition: 'all 0.3s ease',
                        }}
                        transition="all 0.3s ease"
                    >
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="full"
                            bg="primary.500"
                            color="white"
                            boxSize="16"
                            mb="4"
                        >
                            <Icon as={item.icon} boxSize="8" />
                        </Flex>
                        <Heading size="md" mb="3">
                            {item.title}
                        </Heading>
                        <Text>{item.description}</Text>
                    </VStack>
                ))}
            </SimpleGrid>
        </Box>
    )
} 