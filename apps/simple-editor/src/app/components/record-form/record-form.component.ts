import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  CatalogRecord,
  DatasetRecord,
  RecordStatus,
  Role,
} from '@geonetwork-ui/metadata-converter'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordFormComponent {
  @Input() record: CatalogRecord = {
    uniqueIdentifier: '',
    title: '',
    abstract: '',
    lineage: '',
    kind: 'dataset',
    licenses: [],
    overviews: [],
    recordUpdated: new Date(),
    ownerOrganisation: {},
    contacts: [],
    accessConstraints: [],
    updateFrequency: 'unknown',
    distributions: [],
    keywords: [],
    spatialExtents: [],
    temporalExtents: [],
    spatialRepresentation: null,
    status: RecordStatus.UNDER_DEVELOPMENT,
    themes: [],
    useLimitations: [],
  } as DatasetRecord
  @Output() recordChanged = new EventEmitter<CatalogRecord>()

  statusOptions = Object.keys(RecordStatus)
  roleOptions = Object.keys(Role)

  get isDatasetRecord() {
    return this.record.kind === 'dataset'
  }

  emitChangedRecord() {
    this.recordChanged.emit(this.record)
  }
}
