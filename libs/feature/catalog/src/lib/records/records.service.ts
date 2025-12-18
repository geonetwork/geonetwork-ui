import { Injectable, inject } from '@angular/core'
import { Observable, of, switchMap } from 'rxjs'
import { shareReplay } from 'rxjs/operators'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface.js'

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  private recordsRepository = inject(RecordsRepositoryInterface)

  recordsCount$: Observable<number> = of(true).pipe(
    switchMap(() => this.recordsRepository.getMatchesCount({})),
    shareReplay(1)
  )
}
