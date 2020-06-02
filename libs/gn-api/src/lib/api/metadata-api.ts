import { Injectable } from '@angular/core'
import { BasicMetadata } from '../fixtures/metadata.fixtures'
import { Metadata } from '../model/metadata'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MetadataApi {
  constructor() {}

  find(params?: object): Observable<Metadata[]> {
    return of([BasicMetadata, BasicMetadata])
  }
}
