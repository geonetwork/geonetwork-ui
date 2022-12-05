import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import {
  CatalogRecord,
  DatasetDistribution,
  DatasetDistributionType,
  DatasetRecord,
  RecordKind,
  RecordStatus,
  Role,
  ServiceRecord,
} from '@geonetwork-ui/metadata-converter'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
})
export class RecordFormComponent implements AfterViewInit {
  @Input() record: CatalogRecord
  @Output() recordChanged = new EventEmitter<CatalogRecord>()

  statusOptions = Object.keys(RecordStatus)
  roleOptions = Object.keys(Role)

  get isDatasetRecord() {
    return this.record.kind === 'dataset'
  }
  get isServiceRecord() {
    return this.record.kind === 'service'
  }

  constructor() {
    this.switchToRecordKind('dataset')
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.recordChanged.emit(this.record)
    }, 100) // avoid angular error (yuck)
  }

  emitChangedRecord() {
    this.recordChanged.emit(this.record)
  }

  getDistributionForType(type: DatasetDistributionType): DatasetDistribution {
    switch (type) {
      case 'download':
        return {
          type,
          downloadUrl: new URL('', window.location.toString()),
        }
      case 'service':
        return {
          type,
          accessServiceUrl: new URL('', window.location.toString()),
          accessServiceProtocol: 'other',
        }
      case 'link':
        return {
          type,
          linkUrl: new URL('', window.location.toString()),
        }
    }
  }

  switchToRecordKind(kind: RecordKind) {
    const hasPrevious = !!this.record
    const record = {
      uniqueIdentifier: hasPrevious
        ? this.record.uniqueIdentifier
        : '0000-0000-0000-0000',
      title: hasPrevious ? this.record.title : 'My Record',
      abstract: hasPrevious ? this.record.abstract : '',
      licenses: hasPrevious ? [...this.record.licenses] : [],
      recordUpdated: hasPrevious ? this.record.recordUpdated : new Date(),
      ownerOrganisation: hasPrevious
        ? this.record.ownerOrganisation
        : { name: 'My Organization' },
      contacts: hasPrevious ? this.record.contacts : [],
      accessConstraints: hasPrevious ? this.record.accessConstraints : [],
      updateFrequency: hasPrevious ? this.record.updateFrequency : 'unknown',
      keywords: hasPrevious ? this.record.keywords : [],
      themes: hasPrevious ? this.record.themes : [],
      status: hasPrevious ? this.record.status : RecordStatus.UNDER_DEVELOPMENT,
      useLimitations: hasPrevious ? this.record.useLimitations : [],
    }
    if (kind === 'dataset') {
      this.record = {
        ...record,
        kind: 'dataset',
        lineage: '',
        overviews: [],
        distributions: [],
        spatialExtents: [],
        temporalExtents: [],
      } as DatasetRecord
    } else {
      this.record = {
        ...record,
        kind: 'service',
        endpoints: [],
      } as ServiceRecord
    }
    this.recordChanged.emit(this.record)
  }
}
