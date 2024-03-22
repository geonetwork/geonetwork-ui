import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditPageComponent } from './edit-page.component'
import { ActivatedRoute } from '@angular/router'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'

const getRoute = () => ({
  snapshot: {
    data: {
      record: DATASET_RECORDS[0],
    },
  },
})

class EditorFacadeMock {
  openRecord = jest.fn()
}

describe('EditPageComponent', () => {
  let component: EditPageComponent
  let fixture: ComponentFixture<EditPageComponent>
  let facade: EditorFacade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useFactory: getRoute,
        },
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
      ],
    }).compileComponents()

    facade = TestBed.inject(EditorFacade)
    fixture = TestBed.createComponent(EditPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('initial state', () => {
    it('calls openRecord', () => {
      expect(facade.openRecord).toHaveBeenCalledWith(DATASET_RECORDS[0])
    })
  })
})
