import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'
import { TranslateModule } from '@ngx-translate/core'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'
import { MetadataInfoComponent } from './metadata-info.component'

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
    component.metadata = RECORDS_FULL_FIXTURE[0]
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
      fixture.whenStable().then(() => {
        const displayedElement =
          fixture.nativeElement.getElementsByClassName('noUsage')
        expect(displayedElement).toBeFalsy()
      })
    })

    it('should display the keywords section', () => {
      fixture.whenStable().then(() => {
        const displayedElement =
          fixture.nativeElement.querySelector('ng-container')
        expect(displayedElement).toBeTruthy()
      })
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
      fixture.whenStable().then(() => {
        const displayedElement =
          fixture.nativeElement.getElementsByClassName('noUsage')
        expect(displayedElement).toBeFalsy()
      })
    })

    it('should display the keywords section', () => {
      fixture.whenStable().then(() => {
        const displayedElement =
          fixture.nativeElement.querySelector('ng-container')
        expect(displayedElement).toBeTruthy()
      })
    })
  })
  describe('#abstract', () => {
    describe('When abstract contains a link', () => {
      beforeEach(() => {
        component.metadata = {
          id: '',
          uuid: '',
          title: '',
          metadataUrl: '',
          keywords: ['banana', 'pear'],
          constraints: ['no usage'],
          abstract: 'This is a text with a link http://www.google.com',
        }
        fixture.detectChanges()
      })
      it('should create a link in the abstract', () => {
        const paragraph = component.getAbstract()
        expect(paragraph).toContain('<a href="http://www.google.com"')
        expect(paragraph).toContain(
          '<mat-icon class="mat-icon !w-[12px] !h-[14px] !text-[14px] opacity-75 material-icons">open_in_new</mat-icon>'
        )
      })
    })
    describe('When abstract does not contain a link', () => {
      beforeEach(() => {
        component.metadata = {
          id: '',
          uuid: '',
          title: '',
          metadataUrl: '',
          keywords: ['banana', 'pear'],
          constraints: ['no usage'],
          abstract: 'This is a text without a link',
        }
        fixture.detectChanges()
      })
      it('should not create a hyperlink or icon', () => {
        const paragraph = component.getAbstract()
        expect(paragraph).toEqual('This is a text without a link')
      })
    })
  })
})
