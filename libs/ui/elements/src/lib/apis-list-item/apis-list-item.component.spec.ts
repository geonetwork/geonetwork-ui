import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { ApisListItemComponent } from './apis-list-item.component'

describe('ApisListItemComponent', () => {
  let component: ApisListItemComponent
  let fixture: ComponentFixture<ApisListItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApisListItemComponent],
      imports: [MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ApisListItemComponent)
    component = fixture.componentInstance
    component.link = {
      protocol: 'OGC:WFS',
      name: 'Allroads',
      description: 'A file that contains all roads',
      url: 'https//roads.com/wfs',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
