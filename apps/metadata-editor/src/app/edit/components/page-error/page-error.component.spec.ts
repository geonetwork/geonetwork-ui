import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageErrorComponent } from './page-error.component'
import { ActivatedRoute } from '@angular/router'
import { MockProviders } from 'ng-mocks'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('PageErrorComponent', () => {
  let component: PageErrorComponent
  let fixture: ComponentFixture<PageErrorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n(), MockProviders(ActivatedRoute)],
    }).compileComponents()

    fixture = TestBed.createComponent(PageErrorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
