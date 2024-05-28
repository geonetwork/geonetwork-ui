import { Injectable } from '@angular/core'
import { Observable, of, switchMap } from 'rxjs'
import { catchError, shareReplay } from 'rxjs/operators'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  recordsCount$: Observable<number> = of(0).pipe(
    switchMap(() => this.recordsRepository.getMatchesCount({})),
    shareReplay(1),
    catchError(() => of(0))
  )

  constructor(private recordsRepository: RecordsRepositoryInterface) {}
}
