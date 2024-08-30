import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'
import { MetadataInfoComponent } from './metadata-info.component'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'

describe('MetadataInfoComponent', () => {
  let component: MetadataInfoComponent
  let fixture: ComponentFixture<MetadataInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        UtilSharedModule,
        TranslateTestingModule.withTranslations({
          en: {
            'domain.record.updateFrequency.notPlanned': 'Not planned',
            'domain.record.updateFrequency.month':
              '{count, plural, =0{0 times} one{once} other{{count} times}} per month',
          },
        })
          .withDefaultLanguage('en')
          .withCompiler(new TranslateMessageFormatCompiler()),
      ],
      declarations: [MetadataInfoComponent, ContentGhostComponent],
    }).compileComponents()
  })

  describe('When a section is empty', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MetadataInfoComponent)
      component = fixture.componentInstance
      component.metadata = {
        ...datasetRecordsFixture()[0],
        abstract: null,
        licenses: null,
        legalConstraints: null,
        otherConstraints: null,
        extras: {
          isOpenData: false,
        },
        keywords: null,
      } as DatasetRecord
      fixture.detectChanges()
    })
    it('should display a message for no usage or constraints', () => {
      const displayedElement = fixture.nativeElement.querySelector('.noUsage')
      expect(displayedElement).toBeTruthy()
    })
    it('should not display the keywords section', () => {
      const displayedElement =
        fixture.nativeElement.querySelector('ng-container')
      expect(displayedElement).toBeFalsy()
    })
    it('should not display the abstract section', () => {
      const displayedElement =
        fixture.nativeElement.querySelector('.md-description p')
      expect(displayedElement).toBeFalsy()
    })
  })

  describe('When a section is not empty', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(MetadataInfoComponent)
      component = fixture.componentInstance
      component.metadata = {
        ...datasetRecordsFixture()[0],
        lineage: null,
      } as DatasetRecord
      fixture.detectChanges()
    })
    it('should not display a message for no usage or constraints', () => {
      const displayedElement = fixture.nativeElement.querySelector('.noUsage')
      expect(displayedElement).toBeFalsy()
    })
    it('should display the abstract section', () => {
      const displayedElement = fixture.nativeElement.querySelector(
        'gn-ui-markdown-parser'
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
        const displayedElement =
          fixture.nativeElement.querySelector('.updateFrequency')
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
      })
      it('should display the updateFrequency object correctly', () => {
        const displayedElement =
          fixture.nativeElement.querySelector('.updateFrequency')
        expect(displayedElement.textContent).toEqual(' 3 times per month ')
      })
    })
  })
})
