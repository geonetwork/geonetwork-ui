import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DataApisComponent } from './data-apis.component'

describe('DataApisComponent', () => {
  let component: DataApisComponent
  let fixture: ComponentFixture<DataApisComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataApisComponent],
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
