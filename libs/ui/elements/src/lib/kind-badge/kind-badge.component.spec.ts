import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideIcons } from '@ng-icons/core'
import { matClose } from '@ng-icons/material-icons/baseline'
import { Component } from '@angular/core'
import { KindBadgeComponent } from './kind-badge.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

@Component({
  selector: 'gn-ui-badge',
  template: '<ng-content></ng-content>',
})
class MockBadgeComponent {}

describe('KindBadgeComponent', () => {
  let component: KindBadgeComponent
  let fixture: ComponentFixture<KindBadgeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideIcons({ matClose }), provideI18n()],
      declarations: [MockBadgeComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(KindBadgeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
