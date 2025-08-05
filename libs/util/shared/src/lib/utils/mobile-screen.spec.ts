import { getIsMobile } from './mobile-screen'
import { firstValueFrom } from 'rxjs'
import { take, toArray } from 'rxjs/operators'

describe('getIsMobile', () => {
  let originalInnerWidth

  beforeEach(() => {
    originalInnerWidth = window.innerWidth
  })

  afterEach(() => {
    window.innerWidth = originalInnerWidth
  })

  function resizeWindow(width) {
    window.innerWidth = width
    window.dispatchEvent(new Event('resize'))
  }

  it('should emit true if initial width is under mobile threshold', async () => {
    resizeWindow(500)
    const value = await firstValueFrom(getIsMobile().pipe(take(1)))
    expect(value).toBe(true)
  })

  it('should emit false if initial width is above mobile threshold', async () => {
    resizeWindow(1024)
    const value = await firstValueFrom(getIsMobile().pipe(take(1)))
    expect(value).toBe(false)
  })

  it('should emit updated value on resize', async () => {
    resizeWindow(1024)
    const promise = firstValueFrom(getIsMobile().pipe(take(2), toArray()))

    setTimeout(() => {
      resizeWindow(600)
    }, 0)

    const values = await promise
    expect(values).toEqual([false, true])
  })
})
