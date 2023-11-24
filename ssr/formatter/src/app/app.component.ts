import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs/operators'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-root',
  template: `
    <div class="container" *ngIf="metadata">
      <h1>{{ metadata.title }}</h1>
      <p>{{ metadata.abstract }}</p>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  metadata: CatalogRecord

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get(
        'https://apps.titellus.net/es/gn-records/_doc/8a078848-eff3-4cb2-bf4a-309a14279abb'
      )
      .pipe(
        map((hit: any) => {
          return {
            uuid: hit._source.uuid,
            id: hit.id,
            title: hit._source.resourceTitleObject
              ? hit._source.resourceTitleObject.default
              : 'no title',
            abstract: hit._source.resourceAbstractObject
              ? hit._source.resourceAbstractObject.default
              : 'no abstract',
            thumbnailUrl: hit._source.overview ? hit._source.overview.url : '',
            metadataUrl: `/geonetwork/srv/eng/catalog.search#/metadata/${hit._source.uuid}`,
          }
        })
      )
      .subscribe((record) => (this.metadata = record))
  }
}
