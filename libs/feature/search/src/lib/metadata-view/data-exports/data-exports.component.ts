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
    const formats = {
      csv: ['csv'],
      geojson: ['geojson'],
      json: ['json'],
      shp: ['shp', 'shape'],
      kml: ['kml'],
      gpkg: ['gpkg', 'geopackage'],
      excel: ['xls', 'xlsx'],
      pdf: ['pdf'],
      zip: ['zip'],
    }
    if ('format' in link) {
      return link.format
    }
    for (const format in formats) {
      for (const alias of formats[format]) {
        if (this.findFileFormats(link, alias)) return format
      }
    }
    return 'unknown'
  }

  findFileFormats(link: MetadataLink, format: string) {
    return (
      ('name' in link && link.name.match(new RegExp(`${format}`, 'i'))) ||
      ('url' in link && link.url.match(new RegExp(`${format}`, 'i')))
    )
  }
}
