import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'

import { LinkCardComponent } from './link-card.component'

describe('LinkCardComponent', () => {
  let component: LinkCardComponent
  let fixture: ComponentFixture<LinkCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkCardComponent],
      imports: [MatIconModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkCardComponent)
    component = fixture.componentInstance
    component.link = {
      protocol: 'WWW:LINK',
      name: 'Consulter sur Géoclip',
      description:
        'Lorem ipsum dolor sit amet, consect etur adipiscing elit. Donec id condim entum ex. Etiam sed molestie est.',
      url: 'https//example.com/someurlpath',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
