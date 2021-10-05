import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from '@angular/core'
import { MetadataLink } from '@geonetwork-ui/util/shared'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { MdViewFacade } from '../state'

@Component({
  selector: 'gn-ui-data-exports',
  templateUrl: './data-exports.component.html',
  styleUrls: ['./data-exports.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataExportsComponent implements OnInit {
  links$: Observable<Array<MetadataLink>>

  constructor(public facade: MdViewFacade) {}

  ngOnInit() {
    this.links$ = this.facade.downloadLinks$.pipe(
      map((links) =>
        links.map((link) =>
          'format' in link ? link : { ...link, format: this.getFormat(link) }
        )
      )
    )
  }

  getFormat(link: MetadataLink) {
    const extensions = [
      'csv',
      'geojson',
      'json',
      'shp',
      'kml',
      'gpkg',
      'xls',
      'xlsx',
      'zip',
      'pdf',
      'html',
    ]
    if ('format' in link) {
      return link.format
    }
    for (const extension of extensions) {
      if (this.checkFileExtensions(link, extension)) return extension
    }
    return 'unknown'
  }

  checkFileExtensions(link: MetadataLink, extension: string) {
    return (
      ('name' in link && link.name.match(new RegExp(`.${extension}`, 'i'))) ||
      ('url' in link && link.url.match(new RegExp(`.${extension}`, 'i')))
    )
  }
}
