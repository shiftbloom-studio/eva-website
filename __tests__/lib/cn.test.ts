import { describe, it, expect } from 'vitest'
import { cn } from '#lib/cn'

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('should handle empty inputs', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should handle undefined values', () => {
    const result = cn('text-red-500', undefined, 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('should handle null values', () => {
    const result = cn('text-red-500', null, 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('should handle boolean false values', () => {
    const isActive = false
    const result = cn('base', isActive && 'active')
    expect(result).toBe('base')
  })

  it('should handle boolean true values', () => {
    const isActive = true
    const result = cn('base', isActive && 'active')
    expect(result).toBe('base active')
  })

  it('should handle conditional classes with objects', () => {
    const result = cn('base', { 'text-red-500': true, 'bg-blue-500': false })
    expect(result).toBe('base text-red-500')
  })

  it('should merge conflicting Tailwind classes correctly', () => {
    const result = cn('p-4', 'p-8')
    expect(result).toBe('p-8')
  })

  it('should merge conflicting Tailwind variant classes correctly', () => {
    const result = cn('px-4 py-2', 'px-8')
    expect(result).toBe('py-2 px-8')
  })

  it('should handle array inputs', () => {
    const result = cn(['text-red-500', 'bg-blue-500'])
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('should handle complex combinations', () => {
    const variant = 'primary'
    const size = 'lg'
    const isDisabled = false

    const result = cn(
      'base-class',
      variant === 'primary' && 'variant-primary',
      size === 'lg' ? 'text-lg' : 'text-sm',
      isDisabled && 'opacity-50 pointer-events-none',
      {
        'cursor-pointer': !isDisabled,
        'cursor-not-allowed': isDisabled,
      }
    )

    expect(result).toBe('base-class variant-primary text-lg cursor-pointer')
  })
})
