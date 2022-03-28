import { Action } from '@ngrx/store'
import { ActionStateStream } from '@nrwl/angular/src/runtime/nx/data-persistence'
import { Observable } from 'rxjs'

export interface HandleSearchOpts<T extends Array<unknown>> {
  run(): Observable<Action>
  onError?(): Observable<any> | any
}
export function searchOperator<T extends Array<unknown>, A extends Action>(
  opts: HandleSearchOpts<T>
) {
  return (source: ActionStateStream<T, A>) => {
    return source.pipe()
  }
}
