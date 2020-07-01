import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { SortByComponent } from './sort-by.component'
import { UiModule } from '../../../../ui/src'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

describe('SortByComponent', () => {
  let component: SortByComponent
  let fixture: ComponentFixture<SortByComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortByComponent],
      imports: [UiModule, EffectsModule.forRoot(), StoreModule.forRoot({})],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
