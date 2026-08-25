import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecordLinkedRecordsComponent } from './record-linked-records.component'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { By } from '@angular/platform-browser'
import { LinkedRecord } from '@geonetwork-ui/common/domain/model/record'

const linkedRecords = [
  {
    record: { uniqueIdentifier: 'src-1', kind: 'dataset' },
    relation: 'source',
  },
  {
    record: { uniqueIdentifier: 'ds-1', kind: 'dataset' },
    relation: 'sourceOf',
  },
  {
    record: { uniqueIdentifier: 'reuse-1', kind: 'reuse' },
    relation: 'sourceOf',
  },
  {
    record: { uniqueIdentifier: 'svc-1', kind: 'service' },
    relation: 'sourceOf',
  },
  {
    record: { uniqueIdentifier: 'sib-1', kind: 'dataset' },
    relation: 'sibling',
    associationType: 'crossReference',
  },
  {
    record: { uniqueIdentifier: 'sib-2', kind: 'dataset' },
    relation: 'sibling',
    associationType: 'largerWorkCitation',
  },
  {
    record: { uniqueIdentifier: 'sib-3', kind: 'dataset' },
    relation: 'sibling',
    associationType: 'crossReference',
  },
  {
    record: { uniqueIdentifier: 'assoc-1', kind: 'dataset' },
    relation: 'associated',
  },
] as LinkedRecord[]

describe('RecordLinkedRecordsComponent', () => {
  let component: RecordLinkedRecordsComponent
  let fixture: ComponentFixture<RecordLinkedRecordsComponent>
  let facadeLinkedRecords$: BehaviorSubject<LinkedRecord[]>

  const renderedGrids = () =>
    fixture.debugElement
      .queryAll(By.css('datahub-record-internal-links'))
      .map((grid) =>
        grid.componentInstance.records.map(
          ({ uniqueIdentifier }) => uniqueIdentifier
        )
      )

  beforeEach(() => MockBuilder(RecordLinkedRecordsComponent))

  beforeEach(async () => {
    facadeLinkedRecords$ = new BehaviorSubject<LinkedRecord[]>([])
    await TestBed.configureTestingModule({
      imports: [RecordLinkedRecordsComponent],
      providers: [
        MockProvider(MdViewFacade, {
          linkedRecords$: facadeLinkedRecords$,
        }),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RecordLinkedRecordsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('renders no grid when the record has no linked record', () => {
    expect(renderedGrids()).toEqual([])
  })

  it('renders one grid per relation, siblings split by association type', () => {
    facadeLinkedRecords$.next(linkedRecords)
    fixture.detectChanges()

    expect(renderedGrids()).toEqual([
      ['src-1'], // source datasets
      ['ds-1'], // reverse lineage, datasets
      ['reuse-1'], // reverse lineage, reuses
      ['svc-1'], // reverse lineage, services
      ['sib-1', 'sib-3'], // crossReference
      ['sib-2'], // largerWorkCitation
      ['assoc-1'], // reverse associations, last
    ])
  })

  it('groups the siblings by association type', async () => {
    facadeLinkedRecords$.next(linkedRecords)

    expect(await firstValueFrom(component.siblings$)).toEqual({
      crossReference: [
        { uniqueIdentifier: 'sib-1', kind: 'dataset' },
        { uniqueIdentifier: 'sib-3', kind: 'dataset' },
      ],
      largerWorkCitation: [{ uniqueIdentifier: 'sib-2', kind: 'dataset' }],
    })
  })
})
