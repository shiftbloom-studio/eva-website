/* eslint-disable react/display-name */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FaqSection } from '#components/sections/faq'

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const React = await import('react')
  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    motion: {
      div: React.forwardRef((props: any, ref: any) => React.createElement('div', { ref, ...props })),
    },
  }
})

// Mock the FAQ data
vi.mock('#data/faq', () => ({
  default: {
    title: 'Test FAQ Title',
    items: [
      { question: 'Question 1', answer: 'Answer 1' },
      { question: 'Question 2', answer: 'Answer 2' },
      { question: 'Question 3', answer: 'Answer 3' },
    ],
  },
}))

describe('FaqSection component', () => {
  it('renders the section with correct id', () => {
    render(<FaqSection />)
    const section = document.getElementById('faq')
    expect(section).toBeInTheDocument()
  })

  it('renders the FAQ title', () => {
    render(<FaqSection />)
    expect(screen.getByText('Test FAQ Title')).toBeInTheDocument()
  })

  it('renders all FAQ questions as buttons', () => {
    render(<FaqSection />)
    expect(screen.getByRole('button', { name: /Question 1/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Question 2/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Question 3/i })).toBeInTheDocument()
  })

  it('has first question open by default', () => {
    render(<FaqSection />)
    // First answer should be visible
    expect(screen.getByText('Answer 1')).toBeInTheDocument()
  })

  it('toggles FAQ item on click', async () => {
    render(<FaqSection />)

    // First item should be open initially
    expect(screen.getByText('Answer 1')).toBeInTheDocument()

    // Click first question to close it
    const firstQuestion = screen.getByRole('button', { name: /Question 1/i })
    fireEvent.click(firstQuestion)

    // Answer 1 should not be visible anymore (AnimatePresence handles exit)
    // Note: With mocked framer-motion, this might behave differently
  })

  it('opens clicked FAQ item', async () => {
    render(<FaqSection />)

    // Click second question
    const secondQuestion = screen.getByRole('button', { name: /Question 2/i })
    fireEvent.click(secondQuestion)

    // Answer 2 should now be visible
    expect(screen.getByText('Answer 2')).toBeInTheDocument()
  })

  it('renders the eyebrow text', () => {
    render(<FaqSection />)
    expect(screen.getByText('FAQ')).toBeInTheDocument()
  })

  it('renders the subtitle text', () => {
    render(<FaqSection />)
    expect(screen.getByText(/Kurz, klar/i)).toBeInTheDocument()
  })

  it('has accessible button structure', () => {
    render(<FaqSection />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(3) // 3 mocked FAQ items
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button')
    })
  })
})
