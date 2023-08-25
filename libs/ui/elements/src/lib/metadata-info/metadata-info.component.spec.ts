import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'
import { MetadataInfoComponent } from './metadata-info.component'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

describe('MetadataInfoComponent', () => {
  let component: MetadataInfoComponent
  let fixture: ComponentFixture<MetadataInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), UtilSharedModule],
      declarations: [MetadataInfoComponent, ContentGhostComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataInfoComponent)
    component = fixture.componentInstance
    component.incomplete = false
    component.metadata = DATASET_RECORDS[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When a section is empty', () => {
    beforeEach(() => {
      component.metadata = {
        id: '',
        uuid: '',
        title: '',
        metadataUrl: '',
        keywords: [],
        constraints: null,
      }
      fixture.detectChanges()
    })
    it('should display a message for no usage or constraints', () => {
      const displayedElement =
        fixture.nativeElement.getElementsByClassName('noUsage')
      expect(displayedElement).toBeTruthy()
    })

    it('should not display the keywords section', () => {
      const displayedElement =
        fixture.nativeElement.querySelector('ng-container')
      expect(displayedElement).toBeFalsy()
    })
  })

  describe('When a section is not empty', () => {
    beforeEach(() => {
      component.metadata = {
        id: '',
        uuid: '',
        title: '',
        metadataUrl: '',
        keywords: ['banana', 'pear'],
        constraints: ['no usage'],
      }
      fixture.detectChanges()
    })
    it('should not display a message for no usage or constraints', () => {
      // Use waitForAsync to handle asynchronous changes in the DOM.
      fixture.whenStable().then(() => {
        const displayedElement =
          fixture.nativeElement.getElementsByClassName('noUsage')
        expect(displayedElement).toBeFalsy()
      })
    })

    it('should display the keywords section', () => {
      // Use waitForAsync to handle asynchronous changes in the DOM.
      fixture.whenStable().then(() => {
        const displayedElement =
          fixture.nativeElement.querySelector('ng-container')
        expect(displayedElement).toBeTruthy()
      })
    })
  })
})
