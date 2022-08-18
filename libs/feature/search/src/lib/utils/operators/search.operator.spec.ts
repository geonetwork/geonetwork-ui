import { of } from 'rxjs'
import { delay, map } from 'rxjs/operators'
import { RequestMoreResults } from '../../state/actions'
import { switchMapWithSearchId } from './search.operator'
import { fakeAsync, tick } from '@angular/core/testing'

describe('switchMapWithSearchId', () => {
  describe('actions with various search ids', () => {
    let sub
    beforeEach(fakeAsync(() => {
      sub = jest.fn()
      of('A', 'A', 'B', 'C', 'A', 'C')
        .pipe(
          map((id) => new RequestMoreResults(id)),
          switchMapWithSearchId((action) => of(action.id).pipe(delay(10)))
        )
        .subscribe(sub)
      tick(10)
    }))
    it('only unsubscribes previous observables with the same search id', () => {
      expect(sub).toHaveBeenCalledTimes(3)
      expect(sub).toHaveBeenNthCalledWith(1, 'B')
      expect(sub).toHaveBeenNthCalledWith(2, 'A')
      expect(sub).toHaveBeenNthCalledWith(3, 'C')
    })
  })
})
