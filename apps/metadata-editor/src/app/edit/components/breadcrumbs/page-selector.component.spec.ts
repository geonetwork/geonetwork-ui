import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { PageSelectorComponent } from './page-selector.component'
import { EDITOR_CONFIG } from '@geonetwork-ui/feature/editor'

describe('BreadcrumbsComponent', () => {
  let component: PageSelectorComponent
  let fixture: ComponentFixture<PageSelectorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [],
    }).compileComponents()

    fixture = TestBed.createComponent(PageSelectorComponent)
    component = fixture.componentInstance
    component.pages = EDITOR_CONFIG().pages
    component.selectedPage = 0
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
