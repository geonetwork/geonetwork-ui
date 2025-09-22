import { handleScrollOnNavigation } from './scroll'
import { ViewportScroller } from '@angular/common'
import { Router, Scroll, NavigationEnd, Event } from '@angular/router'
import { Subject } from 'rxjs'

describe('handleScrollOnNavigation', () => {
  let router: Router
  let viewportScroller: ViewportScroller
  let events$: Subject<Event>

  beforeEach(() => {
    events$ = new Subject<Event>()
    router = { events: events$.asObservable() } as Router
    viewportScroller = {
      scrollToPosition: jest.fn(),
      scrollToAnchor: jest.fn(),
    } as unknown as ViewportScroller
    handleScrollOnNavigation(router, viewportScroller)
  })

  function createScrollEvent(
    position: [number, number] | null,
    anchor: string | null,
    url: string
  ): Scroll {
    return new Scroll(new NavigationEnd(1, url, url), position, anchor)
  }

  it('should scroll to position on backward navigation', () => {
    const prev = createScrollEvent([100, 200], null, '/prev')
    const curr = createScrollEvent([300, 400], null, '/curr')
    events$.next(prev)
    events$.next(curr)
    expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([300, 400])
    expect(viewportScroller.scrollToAnchor).not.toHaveBeenCalled()
  })

  it('should scroll to anchor on anchor navigation', () => {
    const prev = createScrollEvent(null, null, '/prev')
    const curr = createScrollEvent(null, 'my-anchor', '/curr')
    events$.next(prev)
    events$.next(curr)
    expect(viewportScroller.scrollToAnchor).toHaveBeenCalledWith('my-anchor')
    expect(viewportScroller.scrollToPosition).not.toHaveBeenCalledWith([0, 0])
  })

  it('should scroll to top on forward navigation (route change)', () => {
    const prev = createScrollEvent(null, null, '/route1')
    const curr = createScrollEvent(null, null, '/route2')
    events$.next(prev)
    events$.next(curr)
    expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0])
  })

  it('should not scroll to top if only query params change', () => {
    const prev = createScrollEvent(null, null, '/route1?foo=bar')
    const curr = createScrollEvent(null, null, '/route1?foo=baz')
    events$.next(prev)
    events$.next(curr)
    expect(viewportScroller.scrollToPosition).not.toHaveBeenCalledWith([0, 0])
    expect(viewportScroller.scrollToAnchor).not.toHaveBeenCalled()
  })

  it('should handle multiple events and only act on Scroll events', () => {
    const nonScrollEvent = new NavigationEnd(1, '/foo', '/foo')
    events$.next(nonScrollEvent as any)
    const prev = createScrollEvent(null, null, '/route1')
    const curr = createScrollEvent([10, 20], null, '/route2')
    events$.next(prev)
    events$.next(curr)
    expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([10, 20])
  })

  it('should not scroll if routes are the same and no position or anchor', () => {
    const prev = createScrollEvent(null, null, '/route1')
    const curr = createScrollEvent(null, null, '/route1')
    events$.next(prev)
    events$.next(curr)
    expect(viewportScroller.scrollToPosition).not.toHaveBeenCalled()
    expect(viewportScroller.scrollToAnchor).not.toHaveBeenCalled()
  })
})
