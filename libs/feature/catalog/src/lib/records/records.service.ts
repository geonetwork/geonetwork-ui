import { Injectable } from '@angular/core'
import { Observable, of, switchMap } from 'rxjs'
import { shareReplay } from 'rxjs/operators'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { FieldFilters } from '@geonetwork-ui/common/domain/model/search'
@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(private recordsRepository: RecordsRepositoryInterface) {}
  getRecordsCount(filters: FieldFilters = {}): Observable<number> {
    return of(true).pipe(
      switchMap(() => this.recordsRepository.getMatchesCount(filters)),
      shareReplay(1)
    )
  }
}
