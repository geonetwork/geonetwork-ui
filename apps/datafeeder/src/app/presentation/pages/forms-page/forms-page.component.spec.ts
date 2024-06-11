import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { FormsPageComponent } from './forms-page.component'
import { DatafeederFacade } from '../../../store/datafeeder.facade'
import { of } from 'rxjs'
import { PublishStatusEnumApiModel } from '@geonetwork-ui/data-access/datafeeder'

const uploadStateStatusMock = {
  jobId: '123',
  progress: 1,
  status: PublishStatusEnumApiModel.Pending,
}
const facadeMock = {
  upload$: (() => of(uploadStateStatusMock))(),
  setUpload: jest.fn(),
}
describe('FormsPageComponent', () => {
  let component: FormsPageComponent
  let fixture: ComponentFixture<FormsPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DatafeederFacade,
          useValue: facadeMock,
        },
      ],
      declarations: [FormsPageComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
