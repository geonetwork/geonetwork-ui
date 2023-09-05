import { ComponentFixture, TestBed } from '@angular/core/testing'
import { EditPageComponent } from './edit-page.component'
import { ActivatedRoute } from '@angular/router'
import {
  EditorService,
  RecordFormComponent,
} from '@geonetwork-ui/feature/editor'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

const getRoute = () => ({
  snapshot: {
    data: {
      record: {},
    },
  },
})

class EditorServiceMock {
  setCurrentRecord = jest.fn()
}

describe('EditPageComponent', () => {
  let component: EditPageComponent
  let fixture: ComponentFixture<EditPageComponent>

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
          provide: EditorService,
          useClass: EditorServiceMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(EditPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
