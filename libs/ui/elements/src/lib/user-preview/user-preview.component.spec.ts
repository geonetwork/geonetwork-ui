import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { barbieUserFixture } from '@geonetwork-ui/common/fixtures'
import { UserPreviewComponent } from './user-preview.component'
import { MockBuilder } from 'ng-mocks'
import { AvatarComponent } from '../avatar/avatar.component'
import { MatTooltip } from '@angular/material/tooltip'

const user = barbieUserFixture()

describe('UserPreviewComponent', () => {
  let component: UserPreviewComponent
  let fixture: ComponentFixture<UserPreviewComponent>

  beforeEach(() => MockBuilder(UserPreviewComponent))

  beforeEach(async () => {
    await TestBed.overrideComponent(UserPreviewComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default,
      },
    }).compileComponents()

    fixture = TestBed.createComponent(UserPreviewComponent)
    component = fixture.componentInstance
    component.user = user
    component.avatarPlaceholder = 'https://www.gravatar.com/avatar/?d=mp'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('displays avatar', () => {
    const avatar = fixture.debugElement.query(
      By.directive(AvatarComponent)
    ).componentInstance
    expect(avatar).toBeTruthy()
  })
  describe('compute correct information', () => {
    it('compute user full name', () => {
      expect(component.userFullName).toEqual('Barbara Roberts')
    })
    it('avatar placeholder is good', () => {
      expect(component.avatarPlaceholder).toEqual(
        'https://www.gravatar.com/avatar/?d=mp'
      )
    })
  })
  describe('displays user info', () => {
    let tooltip: MatTooltip
    beforeEach(() => {
      // see https://angular.dev/guide/testing/attribute-directives
      tooltip = fixture.debugElement
        .query(By.directive(MatTooltip))
        .injector.get(MatTooltip)
    })
    it('displays user name', () => {
      expect(tooltip.message).toEqual('Barbara Roberts')
    })
  })
})
