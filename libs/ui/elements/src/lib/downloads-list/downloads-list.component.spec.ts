import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  LinkHelperService,
  MetadataLinkValid,
} from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { LINK_FIXTURES } from '../../../../../util/shared/src/lib/links/link.fixtures'

import { DownloadsListComponent } from './downloads-list.component'

const linkHelperServiceMock = {
  isWfsLink: jest.fn(() => true),
}

@Component({
  selector: 'gn-ui-download-item',
  template: ``,
})
export class DownloadItemComponentMock {
  @Input() link: MetadataLinkValid
  @Input() color: string
}

describe('DownloadsListComponent', () => {
  let component: DownloadsListComponent
  let fixture: ComponentFixture<DownloadsListComponent>
  let de

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [DownloadsListComponent, DownloadItemComponentMock],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: LinkHelperService,
          useValue: linkHelperServiceMock,
        },
      ],
    })
      .overrideComponent(DownloadsListComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsListComponent)
    component = fixture.componentInstance
    component.links = []
    de = fixture.debugElement
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
  describe('when link format is unknown', () => {
    let items: DebugElement[]

    beforeEach(() => {
      component.links = [LINK_FIXTURES.unknownFormat]
      fixture.detectChanges()
      items = de.queryAll(By.directive(DownloadItemComponentMock))
    })
    it('contains one link', () => {
      expect(items.length).toBe(1)
    })
  })
})
