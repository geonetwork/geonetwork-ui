import { Observable, Observer, Subscription } from 'rxjs'
import { AbstractAction } from '../../state/actions'
import { mergeMap } from 'rxjs/operators'

/**
 * This operator will only unsubscribe to previous observables if the new
 * one applies to the same search id; this allows having parallel searches
 * with different id while avoiding concurrent requests with the same
 * search id
 * @param project
 */
export function switchMapWithSearchId<A extends AbstractAction, T>(
  project: (value: A) => Observable<T>
) {
  const subscriptionsBySearchId: { [id: string]: Subscription } = {}
  return (source: Observable<A>) =>
    source.pipe(
      mergeMap(
        (action) =>
          new Observable((observer: Observer<T>) => {
            const { id: searchId } = action
            const observable = project(action)
            if (subscriptionsBySearchId[searchId]) {
              subscriptionsBySearchId[searchId].unsubscribe()
            }
            subscriptionsBySearchId[searchId] = observable.subscribe({
              next(value: T) {
                observer.next(value)
              },
              complete() {
                observer.complete()
              },
              error(err: unknown) {
                observer.error(err)
              },
            })
          })
      )
    )
}
