import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NotifyReuseFormComponent } from './notify-reuse-form.component'
import { ReuseRecord } from '@geonetwork-ui/common/domain/model/record'

const REUSE_RECORD: ReuseRecord = {
  uniqueIdentifier: 'test-reuse-001',
  kind: 'reuse',
  title: 'Test reuse record',
  abstract: 'A test reuse record',
  reuseType: 'application',
  lineage: '',
  onlineResources: [],
  spatialExtents: [],
  temporalExtents: [],
  contacts: [],
  contactsForResource: [],
  keywords: [],
  topics: [],
  legalConstraints: [],
  securityConstraints: [],
  otherConstraints: [],
  overviews: [],
  licenses: [],
  ownerOrganization: { name: 'Test Org', translations: {} },
  recordUpdated: new Date('2024-01-01'),
  defaultLanguage: 'fr',
  otherLanguages: [],
}

describe('NotifyReuseFormComponent', () => {
  let component: NotifyReuseFormComponent
  let fixture: ComponentFixture<NotifyReuseFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifyReuseFormComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(NotifyReuseFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should accept a ReuseRecord as input', () => {
    component.record = REUSE_RECORD
    fixture.detectChanges()
    expect(component.record.kind).toBe('reuse')
  })
})
