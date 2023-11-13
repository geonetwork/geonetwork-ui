import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'
import { MetadataInfoComponent } from './metadata-info.component'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { TranslateTestingModule } from '@geonetwork-ui/util/i18n'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'

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
        ...DATASET_RECORDS[0],
        abstract: null,
        useLimitations: null,
        accessConstraints: null,
        extras: {
          isOpenData: false,
        },
        keywords: null,
      }
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
      component.metadata = { ...DATASET_RECORDS[0], lineage: null }
      fixture.detectChanges()
    })
    it('should not display a message for no usage or constraints', () => {
      const displayedElement = fixture.nativeElement.querySelector('.noUsage')
      expect(displayedElement).toBeFalsy()
    })
    it('should display the keywords section', () => {
      // Use waitForAsync to handle asynchronous changes in the DOM.
      fixture.whenStable().then(() => {
        const displayedElement =
          fixture.nativeElement.querySelector('ng-container')
        expect(displayedElement).toBeTruthy()
      })
    })
    it('should display the abstract section', () => {
      const displayedElement =
        fixture.nativeElement.querySelector('.md-description p')
      expect(displayedElement).toBeTruthy()
    })
    it('should display the metadata origin even if there is no lineage text', () => {
      const displayedElement =
        fixture.nativeElement.querySelector('.metadata-origin')
      expect(displayedElement).toBeTruthy()
    })
  })
  describe('updateFrequency', () => {
    describe('updateFrequency as UpdateFrequencyCode', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(MetadataInfoComponent)
        component = fixture.componentInstance
        component.metadata = {
          ...DATASET_RECORDS[0],
          updateFrequency: 'notPlanned',
        }
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
        component.metadata = DATASET_RECORDS[0]
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
