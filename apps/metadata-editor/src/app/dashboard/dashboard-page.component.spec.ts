import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { DashboardPageComponent } from './dashboard-page.component'
import { CommonModule } from '@angular/common'
import {
  PaginationButtonsComponent,
  RecordTableComponent,
} from '../records/all-records/all-records-list.component.spec'

class SearchFacadeMock {}

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent
  let fixture: ComponentFixture<DashboardPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [DashboardPageComponent],
      providers: [
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
      ],
    })
      .overrideComponent(DashboardPageComponent, {
        set: {
          imports: [
            CommonModule,
            RecordTableComponent,
            PaginationButtonsComponent,
          ],
          providers: [],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(DashboardPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
