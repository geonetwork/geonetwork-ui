import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {
  CatalogRecord,
  OnlineResource,
  OnlineResourceType,
  RecordKind,
  RecordStatusValues,
  RoleValues,
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

  getOnlineResourceForType(type: OnlineResourceType): OnlineResource {
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
          url: new URL('', window.location.toString()),
          accessServiceProtocol: 'other',
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
      otherLanguages: [],
      defaultLanguage: 'en',
      overviews: [],
    }
    if (kind === 'dataset') {
      this.record = {
        ...record,
        kind: 'dataset',
        status: 'under_development',
        updateFrequency: 'unknown',
        lineage: '',
        spatialExtents: [],
        temporalExtents: [],
      }
    } else {
      this.record = {
        ...record,
        kind: 'service',
        spatialExtents: [],
      }
    }
    this.recordChanged.emit(this.record)
  }

  addOwnerOrg() {
    this.record = {
      ...this.record,
      ownerOrganization: {
        name: 'My Organization',
      },
    }
    this.recordChanged.emit(this.record)
  }
}
