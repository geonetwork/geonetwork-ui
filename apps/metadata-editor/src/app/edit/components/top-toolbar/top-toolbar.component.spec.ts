import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TopToolbarComponent } from './top-toolbar.component'
import { Component } from '@angular/core'
import { PublishButtonComponent } from '../publish-button/publish-button.component'

@Component({
  selector: 'md-editor-publish-button',
  template: '',
  standalone: true,
})
class MockPublishButtonComponent {}

describe('TopToolbarComponent', () => {
  let component: TopToolbarComponent
  let fixture: ComponentFixture<TopToolbarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopToolbarComponent],
    })
      .overrideComponent(TopToolbarComponent, {
        add: {
          imports: [MockPublishButtonComponent],
        },
        remove: {
          imports: [PublishButtonComponent],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(TopToolbarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
