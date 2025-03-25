import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matClose } from '@ng-icons/material-icons/baseline'
import { Component } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { KindBadgeComponent } from './kind-badge.component'

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
      imports: [KindBadgeComponent, NgIconComponent, TranslateModule.forRoot()],
      providers: [provideIcons({ matClose })],
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
