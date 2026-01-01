import { describe, it, expect } from 'vitest'
import faq from '#data/faq'

describe('FAQ data', () => {
  it('has a title', () => {
    expect(faq.title).toBeDefined()
    expect(typeof faq.title).toBe('string')
    expect(faq.title.length).toBeGreaterThan(0)
  })

  it('has items array', () => {
    expect(Array.isArray(faq.items)).toBe(true)
    expect(faq.items.length).toBeGreaterThan(0)
  })

  it('each item has a question and answer', () => {
    faq.items.forEach((item) => {
      expect(item.question).toBeDefined()
      expect(typeof item.question).toBe('string')
      expect(item.question.length).toBeGreaterThan(0)

      expect(item.answer).toBeDefined()
      expect(typeof item.answer).toBe('string')
      expect(item.answer.length).toBeGreaterThan(0)
    })
  })

  it('questions are unique', () => {
    const questions = faq.items.map((item) => item.question)
    const uniqueQuestions = new Set(questions)
    expect(uniqueQuestions.size).toBe(questions.length)
  })

  it('contains expected topics', () => {
    const allText = faq.items.map((item) => `${item.question} ${item.answer}`).join(' ')

    // Check for presence of key topics
    expect(allText.toLowerCase()).toContain('erbe von arda')
    expect(allText.toLowerCase()).toContain('mount & blade')
    expect(allText.toLowerCase()).toContain('discord')
  })
})
