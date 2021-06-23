import { Injectable } from '@angular/core'
import {
  PublishJobStatusApiModel,
  UploadJobStatusApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { select, Store } from '@ngrx/store'
import { SetPublication, SetUpload } from './datafeeder.action'
import { DatafeederState } from './datafeeder.reducer'
import { getPublication, getUpload } from './datafeeder.selector'

@Injectable({
  providedIn: 'root',
})
export class DatafeederFacade {
  upload$ = this.store.pipe(select(getUpload))
  publication$ = this.store.pipe(select(getPublication))

  constructor(private store: Store<DatafeederState>) {}

  setUpload(upload: UploadJobStatusApiModel) {
    this.store.dispatch(new SetUpload(upload))
  }
  setPublication(publication: PublishJobStatusApiModel) {
    this.store.dispatch(new SetPublication(publication))
  }
}
