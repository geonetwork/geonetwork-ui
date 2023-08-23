import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  CatalogRecord,
  DatasetDistribution,
  DatasetDistributionType,
  DatasetRecord,
  RecordKind,
  RecordStatusValues,
  RoleValues,
  ServiceOnlineResource,
  ServiceOnlineResourceType,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
})
export class RecordFormComponent implements AfterViewInit {
  @Input() record: CatalogRecord
  @Output() recordChanged = new EventEmitter<CatalogRecord>()

  statusOptions = RecordStatusValues
  roleOptions = RoleValues

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
          url: new URL('', window.location.toString()),
        }
      case 'service':
        return {
          type,
          url: new URL('', window.location.toString()),
          accessServiceProtocol: 'other',
        }
      case 'link':
      default:
        return {
          type: 'link',
          url: new URL('', window.location.toString()),
        }
    }
  }

  getOnlineResourceForType(
    type: ServiceOnlineResourceType
  ): ServiceOnlineResource {
    switch (type) {
      case 'endpoint':
        return {
          type,
          endpointUrl: new URL('', window.location.toString()),
          protocol: 'other',
        }
      case 'link':
        return {
          type,
          url: new URL('', window.location.toString()),
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
      ownerOrganization: hasPrevious
        ? this.record.ownerOrganization
        : { name: 'My Organization' },
      contacts: hasPrevious ? this.record.contacts : [],
      accessConstraints: hasPrevious ? this.record.accessConstraints : [],
      keywords: hasPrevious ? this.record.keywords : [],
      themes: hasPrevious ? this.record.themes : [],
      useLimitations: hasPrevious ? this.record.useLimitations : [],
    }
    if (kind === 'dataset') {
      this.record = {
        ...record,
        kind: 'dataset',
        status: 'under_development',
        updateFrequency: 'unknown',
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
        onlineResources: [],
      } as ServiceRecord
    }
    this.recordChanged.emit(this.record)
  }
}
