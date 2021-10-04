import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DataExportsComponent } from './data-exports.component'

describe('DataExportsComponent', () => {
  let component: DataExportsComponent
  let fixture: ComponentFixture<DataExportsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataExportsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExportsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
