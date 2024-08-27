import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  CatalogRecord,
  DatasetOnlineResource,
  DatasetOnlineResourceType,
  DatasetRecord,
  RecordKind,
  RecordStatusValues,
  RoleValues,
  ServiceOnlineResource,
  ServiceOnlineResourceType,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/model/record'

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

  getOnlineResourceForType(
    type: DatasetOnlineResourceType | ServiceOnlineResourceType
  ): DatasetOnlineResource | ServiceOnlineResource {
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
      case 'endpoint':
        return {
          type,
          endpointUrl: new URL('', window.location.toString()),
          protocol: 'other',
        }
      case 'link':
      default:
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
      recordUpdated: hasPrevious ? this.record.recordUpdated : new Date(),
      ownerOrganization: hasPrevious
        ? this.record.ownerOrganization
        : { name: 'My Organization' },
      contacts: hasPrevious ? this.record.contacts : [],
      contactsForResource: hasPrevious ? this.record.contactsForResource : [],
      licenses: hasPrevious ? [...this.record.licenses] : [],
      legalConstraints: hasPrevious ? [...this.record.legalConstraints] : [],
      securityConstraints: hasPrevious
        ? [...this.record.securityConstraints]
        : [],
      otherConstraints: hasPrevious ? [...this.record.otherConstraints] : [],
      keywords: hasPrevious ? this.record.keywords : [],
      topics: hasPrevious ? this.record.topics : [],
      onlineResources: [],
    }
    if (kind === 'dataset') {
      this.record = {
        ...record,
        kind: 'dataset',
        status: 'under_development',
        updateFrequency: 'unknown',
        lineage: '',
        overviews: [],
        spatialExtents: [],
        temporalExtents: [],
      } as DatasetRecord
    } else {
      this.record = {
        ...record,
        kind: 'service',
      } as ServiceRecord
    }
    this.recordChanged.emit(this.record)
  }
}
