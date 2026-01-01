import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Section, SectionHeader } from '#components/ui/section'

describe('Section component', () => {
  it('renders as a section element by default', () => {
    render(<Section data-testid="section">Content</Section>)
    const element = screen.getByTestId('section')
    expect(element.tagName).toBe('SECTION')
  })

  it('renders as a div when specified', () => {
    render(<Section as="div" data-testid="section">Content</Section>)
    const element = screen.getByTestId('section')
    expect(element.tagName).toBe('DIV')
  })

  it('applies custom className', () => {
    render(<Section className="custom-class" data-testid="section">Content</Section>)
    const element = screen.getByTestId('section')
    expect(element).toHaveClass('custom-class')
  })

  it('renders children correctly', () => {
    render(
      <Section data-testid="section">
        <div data-testid="child">Child content</div>
      </Section>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('passes through additional props', () => {
    render(<Section data-testid="section" id="test-section" aria-label="Test Section">Content</Section>)
    const element = screen.getByTestId('section')
    expect(element).toHaveAttribute('id', 'test-section')
    expect(element).toHaveAttribute('aria-label', 'Test Section')
  })
})

describe('SectionHeader component', () => {
  it('renders title correctly', () => {
    render(<SectionHeader title="Test Title" />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title')
  })

  it('renders subtitle when provided', () => {
    render(<SectionHeader title="Test Title" subtitle="Test Subtitle" />)
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    render(<SectionHeader title="Test Title" />)
    expect(screen.queryByText('Test Subtitle')).not.toBeInTheDocument()
  })

  it('renders eyebrow when provided', () => {
    render(<SectionHeader title="Test Title" eyebrow="Test Eyebrow" />)
    expect(screen.getByText('Test Eyebrow')).toBeInTheDocument()
  })

  it('does not render eyebrow when not provided', () => {
    render(<SectionHeader title="Test Title" />)
    // Ensure we have exactly one p element (not the eyebrow)
    const paragraphs = screen.queryAllByRole('paragraph')
    // There should be no paragraphs if subtitle is also not provided
    expect(paragraphs).toHaveLength(0)
  })

  it('renders all elements when all props provided', () => {
    render(
      <SectionHeader
        title="Test Title"
        subtitle="Test Subtitle"
        eyebrow="Test Eyebrow"
      />
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title')
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
    expect(screen.getByText('Test Eyebrow')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <SectionHeader
        title="Test Title"
        className="custom-header-class"
        data-testid="header"
      />
    )
    expect(screen.getByTestId('header')).toHaveClass('custom-header-class')
  })
})
