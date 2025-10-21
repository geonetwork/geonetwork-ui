import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StacViewComponent } from './stac-view.component'
import { TranslatePipe } from '@ngx-translate/core'

describe('StacViewComponent', () => {
  let component: StacViewComponent
  let fixture: ComponentFixture<StacViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StacViewComponent],
      providers: [
        {
          provide: TranslatePipe,
          useValue: { transform: (key: string) => key },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(StacViewComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
