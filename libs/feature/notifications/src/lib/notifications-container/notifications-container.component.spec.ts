import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NotificationsContainerComponent } from './notifications-container.component'

describe('NotificationsContainerComponent', () => {
  let component: NotificationsContainerComponent
  let fixture: ComponentFixture<NotificationsContainerComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationsContainerComponent],
    })
    fixture = TestBed.createComponent(NotificationsContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
