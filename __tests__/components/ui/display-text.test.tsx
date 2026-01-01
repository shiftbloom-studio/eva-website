import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DisplayText } from '#components/ui/display-text'

// Mock framer-motion with useReducedMotion returning true for simpler testing
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...actual,
    useReducedMotion: () => true, // Force reduced motion for simpler testing
  }
})

describe('DisplayText component', () => {
  it('renders text content', () => {
    render(<DisplayText text="Hello World" />)
    // With reduced motion, text is rendered as-is
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders as h1 by default', () => {
    render(<DisplayText text="Heading" />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders as specified element', () => {
    render(<DisplayText text="Heading 2" as="h2" />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders as h3 when specified', () => {
    render(<DisplayText text="Heading 3" as="h3" />)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('renders as paragraph when specified', () => {
    render(<DisplayText text="Paragraph text" as="p" />)
    expect(screen.getByText('Paragraph text')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<DisplayText text="Test" className="custom-class" />)
    const heading = screen.getByRole('heading')
    expect(heading).toHaveClass('custom-class')
  })

  it('handles multi-line text with newlines', () => {
    render(<DisplayText text={'Line one\nLine two'} />)
    // In reduced motion mode, the component still splits by newline and uses <br>
    // The text contains both lines separated by br tags
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
    expect(heading.textContent).toContain('Line one')
    expect(heading.textContent).toContain('Line two')
  })

  it('handles single word text', () => {
    render(<DisplayText text="Single" />)
    expect(screen.getByText('Single')).toBeInTheDocument()
  })

  it('handles empty string', () => {
    render(<DisplayText text="" data-testid="empty-text" />)
    const element = screen.getByRole('heading')
    expect(element).toBeInTheDocument()
  })

  it('handles text with multiple words', () => {
    render(<DisplayText text="Word1 Word2 Word3" />)
    expect(screen.getByText('Word1 Word2 Word3')).toBeInTheDocument()
  })

  it('renders as span when specified', () => {
    render(<DisplayText text="Span content" as="span" />)
    expect(screen.getByText('Span content')).toBeInTheDocument()
  })

  it('uses default stagger value', () => {
    render(<DisplayText text="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('accepts custom stagger value', () => {
    render(<DisplayText text="Test" stagger={0.1} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('accepts custom delay value', () => {
    render(<DisplayText text="Test" delay={0.5} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('accepts once prop', () => {
    render(<DisplayText text="Test" once={false} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
