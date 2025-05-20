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
        <VStack spacing="4" align="stretch" pt={{ base: "20", md: "0" }}>
          <Hero
            title="Erbe von Arda"
            description="Ein Mount & Blade 2: Bannerlord Rollenspiel-Server in der Welt von Arda. Erlebe deine eigenen Abenteuer in der Welt von Mittelerde und erschaffe deine eigene Geschichte."
            ctaText="Discord beitreten"
            ctaLink="https://discord.gg/erbevonarda"
            cta2Text="Unterstützen"
            cta2Link="https://buymeacoffee.com/erbevonarda"
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
            index={0}
          />
          <ConceptSection
            id="politik"
            title={concepts.politik.title}
            description={concepts.politik.description}
            content={concepts.politik.content}
            index={1}
          />
          <ConceptSection
            id="kampf"
            title={concepts.kampf.title}
            description={concepts.kampf.description}
            content={concepts.kampf.content}
            index={2}
          />
          <ConceptSection
            id="rollenspiel"
            title={concepts.rollenspiel.title}
            description={concepts.rollenspiel.description}
            content={concepts.rollenspiel.content}
            index={3}
          />
          <Faq {...faq} />
        </VStack>
      </Box>
    </>
  )
}

export default Home
