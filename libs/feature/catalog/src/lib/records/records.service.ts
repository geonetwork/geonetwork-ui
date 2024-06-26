import { Injectable } from '@angular/core'
import { Observable, of, switchMap } from 'rxjs'
import { shareReplay } from 'rxjs/operators'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  recordsCount$: Observable<number> = of(true).pipe(
    switchMap(() => this.recordsRepository.getMatchesCount({})),
    shareReplay(1)
  )

  constructor(private recordsRepository: RecordsRepositoryInterface) {}
}
