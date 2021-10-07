import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ApisListComponent } from './apis-list.component'
import { ApisListItemComponent } from '../apis-list-item/apis-list-item.component'
import { MatIconModule } from '@angular/material/icon'

describe('ApisListComponent', () => {
  let component: ApisListComponent
  let fixture: ComponentFixture<ApisListComponent>

  const linksMock = [
    {
      protocol: 'OGC:WFS',
      name: 'Roads',
      description: 'A file that contains all roads',
      url: 'https//roads.com/wfs',
    },
    {
      protocol: 'ESRI:REST',
      name: 'Roads',
      description: 'A file that contains all roads',
      url: 'https//roads.com/rest',
    },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApisListComponent, ApisListItemComponent],
      imports: [MatIconModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ApisListComponent)
    component = fixture.componentInstance
    component.links = linksMock
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
