import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddLayerFromWmsComponent } from './add-layer-from-wms.component'

describe('AddLayerFromWmsComponent', () => {
  let component: AddLayerFromWmsComponent
  let fixture: ComponentFixture<AddLayerFromWmsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLayerFromWmsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AddLayerFromWmsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
