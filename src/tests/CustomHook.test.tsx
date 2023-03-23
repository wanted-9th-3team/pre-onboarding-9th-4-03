import { renderHook, act } from '@testing-library/react'
import { it, vi } from 'vitest'
import useUrlSearch from '@hooks/useUrlSearch'
import { useSearchParams } from 'react-router-dom'

vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom')
  if (originalModule) {
    const mockUrl = new URLSearchParams({ name: '1234' })
    return {
      ...originalModule,
      useSearchParams: () => [
        mockUrl,
        (newUrl: { [key: string]: string }) =>
          mockUrl.set(newUrl.key, newUrl.value),
      ],
    }
  }
  return null
})

describe('useUrlSearch', () => {
  it('should get name search params when we use getSearchParams function', () => {
    const { result } = renderHook(() => useUrlSearch())
    let query = ''
    act(() => {
      query = result.current.getSearchParams('name')
    })
    expect(query).toBe('1234')
  })

  it('should set id search params when we use setSearchParams function', () => {
    const { result } = renderHook(() => useUrlSearch())

    act(() => result.current.setSearchParams({ id: '1' }))

    const [url] = useSearchParams()

    expect(url.get('id')).toBe('1')
  })

  it('should get modified name search params modified when we use setSearchParams function', () => {
    const { result } = renderHook(() => useUrlSearch())

    act(() => result.current.setSearchParams({ name: 'abc' }))

    const [url] = useSearchParams()

    expect(url.get('name')).toBe('abc')
  })
})
