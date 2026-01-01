import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrollSpy } from '#hooks/use-scrollspy'

describe('useScrollSpy hook', () => {
  let mockObserverInstance: {
    observe: ReturnType<typeof vi.fn>
    unobserve: ReturnType<typeof vi.fn>
    disconnect: ReturnType<typeof vi.fn>
    callback: IntersectionObserverCallback | null
  }

  beforeEach(() => {
    mockObserverInstance = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      callback: null,
    }

    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn().mockImplementation((callback: IntersectionObserverCallback) => {
        mockObserverInstance.callback = callback
        return {
          observe: mockObserverInstance.observe,
          unobserve: mockObserverInstance.unobserve,
          disconnect: mockObserverInstance.disconnect,
        }
      })
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should return undefined initially', () => {
    // Create mock elements
    const mockElement = document.createElement('div')
    mockElement.id = 'section-1'
    document.body.appendChild(mockElement)

    const { result } = renderHook(() => useScrollSpy(['#section-1']))

    expect(result.current).toBe(undefined)

    document.body.removeChild(mockElement)
  })

  it('should observe elements matching selectors', () => {
    const mockElement1 = document.createElement('div')
    mockElement1.id = 'section-1'
    const mockElement2 = document.createElement('div')
    mockElement2.id = 'section-2'

    document.body.appendChild(mockElement1)
    document.body.appendChild(mockElement2)

    renderHook(() => useScrollSpy(['#section-1', '#section-2']))

    expect(mockObserverInstance.observe).toHaveBeenCalledWith(mockElement1)
    expect(mockObserverInstance.observe).toHaveBeenCalledWith(mockElement2)

    document.body.removeChild(mockElement1)
    document.body.removeChild(mockElement2)
  })

  it('should handle non-existent elements gracefully', () => {
    const mockElement = document.createElement('div')
    mockElement.id = 'section-1'
    document.body.appendChild(mockElement)

    renderHook(() => useScrollSpy(['#section-1', '#non-existent']))

    expect(mockObserverInstance.observe).toHaveBeenCalledTimes(1)
    expect(mockObserverInstance.observe).toHaveBeenCalledWith(mockElement)

    document.body.removeChild(mockElement)
  })

  it('should update activeId when element becomes intersecting', () => {
    const mockElement = document.createElement('div')
    mockElement.id = 'section-1'
    document.body.appendChild(mockElement)

    const { result } = renderHook(() => useScrollSpy(['#section-1']))

    // Simulate intersection
    act(() => {
      mockObserverInstance.callback?.(
        [
          {
            isIntersecting: true,
            target: mockElement,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toBe('section-1')

    document.body.removeChild(mockElement)
  })

  it('should disconnect observer on unmount', () => {
    const mockElement = document.createElement('div')
    mockElement.id = 'section-1'
    document.body.appendChild(mockElement)

    const { unmount } = renderHook(() => useScrollSpy(['#section-1']))

    unmount()

    expect(mockObserverInstance.disconnect).toHaveBeenCalled()

    document.body.removeChild(mockElement)
  })

  it('should accept custom IntersectionObserver options', () => {
    const mockElement = document.createElement('div')
    mockElement.id = 'section-1'
    document.body.appendChild(mockElement)

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-100px',
      threshold: 0.5,
    }

    renderHook(() => useScrollSpy(['#section-1'], options))

    expect(IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), options)

    document.body.removeChild(mockElement)
  })

  it('should re-observe when selectors change', () => {
    const mockElement1 = document.createElement('div')
    mockElement1.id = 'section-1'
    const mockElement2 = document.createElement('div')
    mockElement2.id = 'section-2'

    document.body.appendChild(mockElement1)
    document.body.appendChild(mockElement2)

    const { rerender } = renderHook(({ selectors }) => useScrollSpy(selectors), {
      initialProps: { selectors: ['#section-1'] },
    })

    expect(mockObserverInstance.observe).toHaveBeenCalledTimes(1)

    rerender({ selectors: ['#section-1', '#section-2'] })

    expect(mockObserverInstance.disconnect).toHaveBeenCalled()
    expect(mockObserverInstance.observe).toHaveBeenCalledWith(mockElement2)

    document.body.removeChild(mockElement1)
    document.body.removeChild(mockElement2)
  })
})
