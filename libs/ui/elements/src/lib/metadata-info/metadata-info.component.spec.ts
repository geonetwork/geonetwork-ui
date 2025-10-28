import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  DatasetRecord,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/model/record'
import {
  datasetRecordsFixture,
  simpleServiceRecordFixture,
} from '@geonetwork-ui/common/fixtures'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { MetadataInfoComponent } from './metadata-info.component'

describe('MetadataInfoComponent', () => {
  let component: MetadataInfoComponent
  let fixture: ComponentFixture<MetadataInfoComponent>

  const expandPanel = (fixture: ComponentFixture<any>, dataTest: string) => {
    const panel = fixture.debugElement.query(
      By.css(`[data-test="${dataTest}"]`)
    )
    if (panel) {
      const titleEl = panel.query(By.css('.title'))
      titleEl.nativeElement.click()
      fixture.detectChanges()
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations({
          en: {
            'domain.record.updateFrequency.notPlanned': 'Not planned',
            'domain.record.updateFrequency.month':
              '{count, plural, =0{0 times} one{once} other{{count} times}} per month',
          },
        })
          .withDefaultLanguage('en')
          .withCompiler(new TranslateMessageFormatCompiler()),
        MetadataInfoComponent,
      ],
    }).compileComponents()
  })

  describe('abstract', () => {
    describe('When abstract is defined', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should display the abstract section', () => {
        const displayedElement = fixture.debugElement.query(
          By.css(`[data-test="metadata-info-abstract"]`)
        )
        expect(displayedElement).toBeTruthy()
      })
    })
    describe('When abstract is not defined', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
          abstract: '',
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should not display the abstract section', () => {
        const displayedElement = fixture.debugElement.query(
          By.css(`[data-test="metadata-info-abstract"]`)
        )
        expect(displayedElement).toBeFalsy()
      })
    })
  })
  describe('keywords', () => {
    describe('When keywords are defined', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should display the keywords', () => {
        const displayedElement = fixture.nativeElement.querySelector(
          '.metadata-info-keywords'
        )
        expect(displayedElement).toBeTruthy()
      })
    })
    describe('When keywords are not defined', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
          keywords: [],
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should not display the keywords section', () => {
        const displayedElement = fixture.nativeElement.querySelector(
          '.metadata-info-keywords'
        )
        expect(displayedElement).toBeFalsy()
      })
    })
  })
  describe('usage panel', () => {
    describe('When usage or constraints are defined', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should display the details panel', () => {
        const detailsPanel = fixture.debugElement.query(
          By.css('[data-test="details-panel"]')
        )
        expect(detailsPanel).toBeTruthy()
      })
      it('should not display a message for no usage or constraints', () => {
        expandPanel(fixture, 'details-panel')
        const displayedElement = fixture.nativeElement.querySelector('.noUsage')
        expect(displayedElement).toBeFalsy()
      })
    })
    describe('When no usage or constraints are defined', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
          licenses: null,
          legalConstraints: null,
          otherConstraints: null,
          extras: {
            isOpenData: false,
          },
        } as DatasetRecord
        fixture.detectChanges()
        expandPanel(fixture, 'usage-panel')
      })
      it('should display the usage panel', () => {
        const usagePanel = fixture.debugElement.query(
          By.css('[data-test="usage-panel"]')
        )
        expect(usagePanel).toBeTruthy()
      })
      it('should display a message for no usage or constraints', () => {
        const displayedElement = fixture.nativeElement.querySelector('.noUsage')
        expect(displayedElement).toBeTruthy()
      })
    })
    describe('legalConstraints', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = datasetRecordsFixture()[0] as DatasetRecord
        fixture.detectChanges()
      })
      it('should filter out the licenses from the legal constraints', () => {
        component.metadata = {
          ...datasetRecordsFixture()[0],
          licenses: [
            ...datasetRecordsFixture()[0].licenses,
            {
              text: 'Contains sensitive information related to national defense',
              url: new URL('https:/google.com/pages/licence/'),
            },
          ],
        } as DatasetRecord
        expect(component.legalConstraints).toEqual([
          "Dataset access isn't possible since it does not really exist",
        ])
      })
      it('should not return anything if the license is the only legal constraint', () => {
        component.metadata = {
          ...datasetRecordsFixture()[0],
          legalConstraints: datasetRecordsFixture()[0].licenses,
        } as DatasetRecord
        fixture.detectChanges()
        expect(component.legalConstraints).toEqual([])
      })
    })
  })
  describe('details panel', () => {
    describe('empty details', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
          lineage: null,
          contactsForResource: [],
          resourceCreated: null,
          resourcePublished: null,
          resourceUpdated: null,
          updateFrequency: null,
          otherLanguages: [],
          temporalExtents: [],
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should not display the details panel', () => {
        const detailsPanel = fixture.debugElement.query(
          By.css('[data-test="details-panel"]')
        )
        expect(detailsPanel).toBeFalsy()
      })
    })
    describe('only lineage', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
          contactsForResource: [],
          resourceCreated: null,
          resourcePublished: null,
          resourceUpdated: null,
          updateFrequency: null,
          otherLanguages: [],
          temporalExtents: [],
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should display the lineage section', () => {
        expandPanel(fixture, 'details-panel')
        const displayedElement = fixture.debugElement.query(
          By.css('[data-test="details-panel-lineage"]')
        )
        expect(displayedElement).toBeTruthy()
      })
    })
    describe('only resourceContact', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
          lineage: null,
          resourceCreated: null,
          resourcePublished: null,
          resourceUpdated: null,
          updateFrequency: null,
          otherLanguages: [],
          temporalExtents: [],
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should display the resourceContact section', () => {
        expandPanel(fixture, 'details-panel')
        const displayedElement = fixture.debugElement.query(
          By.css('[data-test="details-panel-resource-contact"]')
        )
        expect(displayedElement).toBeTruthy()
      })
    })
    describe('only resourceCreated', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
          lineage: null,
          contactsForResource: [],
          resourcePublished: null,
          resourceUpdated: null,
          updateFrequency: null,
          otherLanguages: [],
          temporalExtents: [],
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should display the resourceCreated section', () => {
        expandPanel(fixture, 'details-panel')
        const displayedElement = fixture.debugElement.query(
          By.css('[data-test="details-panel-resource-created"]')
        )
        expect(displayedElement).toBeTruthy()
      })
    })
    describe('only resourcePublished', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
          lineage: null,
          contactsForResource: [],
          resourceCreated: null,
          resourceUpdated: null,
          resourcePublished: new Date('2022-10-01T14:18:19'),
          updateFrequency: null,
          otherLanguages: [],
          temporalExtents: [],
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should display the resourcePublished section', () => {
        expandPanel(fixture, 'details-panel')
        const displayedElement = fixture.debugElement.query(
          By.css('[data-test="details-panel-resource-published"]')
        )
        expect(displayedElement).toBeTruthy()
      })
    })
    describe('only resourceUpdated', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
          lineage: null,
          contactsForResource: [],
          resourceCreated: null,
          resourcePublished: null,
          updateFrequency: null,
          otherLanguages: [],
          temporalExtents: [],
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should display the resourceUpdated section', () => {
        expandPanel(fixture, 'details-panel')
        const displayedElement = fixture.debugElement.query(
          By.css('[data-test="details-panel-resource-updated"]')
        )
        expect(displayedElement).toBeTruthy()
      })
    })
    describe('updateFrequency', () => {
      describe('updateFrequency is not defined', () => {
        beforeEach(() => {
          fixture = TestBed.createComponent(MetadataInfoComponent)
          component = fixture.componentInstance
          component.metadata = {
            ...datasetRecordsFixture()[0],
            updateFrequency: undefined,
          } as DatasetRecord
          fixture.detectChanges()
        })
        it('should not display the updateFrequency section', () => {
          const displayedElement = fixture.debugElement.query(
            By.css('[data-test="details-panel-update-frequency"]')
          )
          expect(displayedElement).toBeFalsy()
        })
      })
      describe('updateFrequency as UpdateFrequencyCode', () => {
        beforeEach(() => {
          fixture = TestBed.createComponent(MetadataInfoComponent)
          component = fixture.componentInstance
          component.metadata = {
            ...datasetRecordsFixture()[0],
            updateFrequency: 'notPlanned',
          } as DatasetRecord
          fixture.detectChanges()
          expandPanel(fixture, 'details-panel')
        })
        it('should display the updateFrequency code correctly', () => {
          const displayedElement =
            fixture.nativeElement.querySelector('.updateFrequency')
          expect(displayedElement.textContent).toEqual(' Not planned ')
        })
      })
      describe('updateFrequency as UpdateFrequencyCustom', () => {
        beforeEach(() => {
          fixture = TestBed.createComponent(MetadataInfoComponent)
          component = fixture.componentInstance
          component.metadata = datasetRecordsFixture()[0] as DatasetRecord
          fixture.detectChanges()
          expandPanel(fixture, 'details-panel')
        })
        it('should display the updateFrequency object correctly', () => {
          const displayedElement =
            fixture.nativeElement.querySelector('.updateFrequency')
          expect(displayedElement.textContent).toEqual(' 3 times per month ')
        })
      })
    })
    describe('only otherLanguages', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
          lineage: null,
          contactsForResource: [],
          resourceCreated: null,
          resourcePublished: null,
          resourceUpdated: null,
          updateFrequency: null,
          temporalExtents: [],
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should display the otherLanguages section', () => {
        expandPanel(fixture, 'details-panel')
        const displayedElement = fixture.debugElement.query(
          By.css('[data-test="details-panel-other-languages"]')
        )
        expect(displayedElement).toBeTruthy()
      })
    })
    describe('only temporalExtent', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...datasetRecordsFixture()[0],
          lineage: null,
          contactsForResource: [],
          resourceCreated: null,
          resourcePublished: null,
          resourceUpdated: null,
          updateFrequency: null,
          otherLanguages: [],
          temporalExtents: [
            {
              start: new Date('2020-01-01T00:00:00Z'),
              end: new Date('2020-12-31T23:59:59Z'),
            },
          ],
        } as DatasetRecord
        fixture.detectChanges()
      })
      it('should display the temporalExtent section', () => {
        expandPanel(fixture, 'details-panel')
        const displayedElement = fixture.debugElement.query(
          By.css('[data-test="details-panel-temporal-extent"]')
        )
        expect(displayedElement).toBeTruthy()
      })
    })
  })
  describe('spatial extent panel', () => {
    describe('spatialExtent is defined on a service', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...simpleServiceRecordFixture()[0],
          spatialExtents: [
            {
              geometry: {
                coordinates: [
                  [
                    [-180, -90],
                    [180, -90],
                    [180, 90],
                    [-180, 90],
                    [-180, -90],
                  ],
                ],
                type: 'Polygon',
              },
            },
          ],
        } as ServiceRecord
        fixture.detectChanges()
      })
      it('should display the spatial extent panel', () => {
        const displayedElement = fixture.debugElement.query(
          By.css('[data-test="spatial-extent-panel"]')
        )
        expect(displayedElement).toBeTruthy()
      })
    })
    describe('spatialExtent is defined but empty on a service', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...simpleServiceRecordFixture()[0],
        } as ServiceRecord
        fixture.detectChanges()
      })
      it('should not display the spatial extent panel', () => {
        const displayedElement = fixture.debugElement.query(
          By.css('[data-test="spatial-extent-panel"]')
        )
        expect(displayedElement).toBeFalsy()
      })
    })
  })
})
