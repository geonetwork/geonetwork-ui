import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageErrorComponent } from './page-error.component'
import { ActivatedRoute } from '@angular/router'
import { MockProviders } from 'ng-mocks'
import { TranslateModule } from '@ngx-translate/core'

describe('PageErrorComponent', () => {
  let component: PageErrorComponent
  let fixture: ComponentFixture<PageErrorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageErrorComponent, TranslateModule.forRoot()],
      providers: [MockProviders(ActivatedRoute)],
    }).compileComponents()

    fixture = TestBed.createComponent(PageErrorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
