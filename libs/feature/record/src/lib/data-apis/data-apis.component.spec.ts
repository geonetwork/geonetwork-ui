import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Subject } from 'rxjs'
import { MdViewFacade } from '../state'

import { DataApisComponent } from './data-apis.component'

class MdViewFacadeMock {
  apiLinks$ = new Subject()
}

describe('DataApisComponent', () => {
  let component: DataApisComponent
  let fixture: ComponentFixture<DataApisComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataApisComponent],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataApisComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
