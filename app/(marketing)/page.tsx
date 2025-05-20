'use client'

import { Box, Container, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'

import { ConceptSection } from '#components/features/concept-section'
import { Pillars } from '#components/features/pillars'
import { Faq } from '#components/faq/faq'
import { Hero } from '#components/hero/hero'
import { Highlights } from '#components/highlights'
import { BackgroundGradient } from '#components/gradients/background-gradient'

import faq from '#data/faq'
import features from '#data/features'
import highlights from '#data/highlights'
import pillars from '#data/pillars'
import concepts from '#data/concepts'
import { Features } from '#components/features/features'

const Home: NextPage = () => {
  return (
    <>
      <Box>
        <BackgroundGradient height="100%" zIndex="-1" />
        <VStack spacing="8" align="stretch" pt={{ base: "20", md: "0" }}>
          <Hero
            title="Erbe von Arda"
            description="Ein Mount & Blade 2: Bannerlord Rollenspiel-Server in der Welt von Arda"
            ctaText="Discord beitreten"
            ctaLink="https://discord.gg/erbevonarda"
            image="/static/screenshots/border_village_gondor.png"
          />

          <Container maxW="container.xl">
            <Highlights {...highlights} />
          </Container>

          <Features {...features} />

          <Pillars {...pillars} />

          <ConceptSection
            id="wirtschaft"
            title={concepts.wirtschaft.title}
            description={concepts.wirtschaft.description}
            content={concepts.wirtschaft.content}
          />

          <ConceptSection
            id="politik"
            title={concepts.politik.title}
            description={concepts.politik.description}
            content={concepts.politik.content}
          />

          <ConceptSection
            id="kampf"
            title={concepts.kampf.title}
            description={concepts.kampf.description}
            content={concepts.kampf.content}
          />

          <ConceptSection
            id="rollenspiel"
            title={concepts.rollenspiel.title}
            description={concepts.rollenspiel.description}
            content={concepts.rollenspiel.content}
          />

          <Faq {...faq} />
        </VStack>
      </Box>
    </>
  )
}

export default Home
