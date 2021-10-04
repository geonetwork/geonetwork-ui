import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'
import { ColorService, MetadataLinkValid } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-export-entry',
  templateUrl: './export-entry.component.html',
  styleUrls: ['./export-entry.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntryComponent implements OnInit {
  @Input() link: MetadataLinkValid
  @Output() exportUrl = new EventEmitter<string>()

  format: string
  color: string

  ngOnInit(): void {
    this.format = this.getFormat(this.link)
    this.color = ColorService.generateLabelColor(this.format, 0.6, 0.5)
  }

  getFormat(link: MetadataLinkValid) {
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
    for (const extension of extensions) {
      if (this.checkFileExtensions(link, extension)) return extension
    }
    return 'unknown'
  }

  checkFileExtensions(link: MetadataLinkValid, extension: string) {
    return (
      ('name' in link && link.name.match(new RegExp(`.${extension}`, 'i'))) ||
      ('url' in link && link.url.match(new RegExp(`.${extension}`, 'i')))
    )
  }

  openUrl() {
    this.exportUrl.emit(this.link.url)
  }
}
