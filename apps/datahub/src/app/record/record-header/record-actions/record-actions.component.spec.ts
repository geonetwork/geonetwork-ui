import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { FavoriteStarComponent } from '@geonetwork-ui/feature/search'
import { LanguageSwitcherComponent } from '@geonetwork-ui/ui/catalog'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { provideIcons } from '@ng-icons/core'
import { matEdit } from '@ng-icons/material-icons/baseline'
import { TranslateModule } from '@ngx-translate/core'
import { RecordActionsComponent } from './record-actions.component'
import { MockProvider } from 'ng-mocks'
import { RecordHeaderService } from '../record-header.service'
import { BehaviorSubject, of } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getGlobalConfig() {
    return {
      LANGUAGES: ['en', 'es'],
    }
  },
  getOptionalSearchConfig() {
    return {
      LIMIT: 10,
    }
  },
}))

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'gn-ui-favorite-star',
  template: '<div class="mock-favorite"></div>',
  standalone: true,
})
class MockFavoriteStarComponent {
  @Input() record: any
  @Input() displayLabel = false
  @Input() displayCount = false
  @Input() buttonType = ''
}

describe('RecordActionsComponent', () => {
  let component: RecordActionsComponent
  let fixture: ComponentFixture<RecordActionsComponent>
  let _supportsAuthentication = true

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RecordActionsComponent,
        TranslateModule.forRoot(),
        ButtonComponent,
        LanguageSwitcherComponent,
        MockFavoriteStarComponent,
      ],
      providers: [
        provideIcons({ matEdit }),
        MockProvider(PlatformServiceInterface, {
          supportsAuthentication: jest.fn(() => _supportsAuthentication),
        }),
        MockProvider(RecordHeaderService, {
          back: jest.fn(),
          canEditFromUrl$: new BehaviorSubject(true),
          openEditUrl: jest.fn(),
        }),
      ],
    })
      .overrideComponent(RecordActionsComponent, {
        remove: { imports: [FavoriteStarComponent] },
        add: { imports: [MockFavoriteStarComponent] },
      })
      .compileComponents()

    fixture = TestBed.createComponent(RecordActionsComponent)
    component = fixture.componentInstance
  })

  afterEach(() => {
    _supportsAuthentication = true
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  describe('Edit Button', () => {
    it('should show the edit button when the user can edit and not on mobile', () => {
      component.canEdit$ = of(true)
      component.isMobile$ = of(false)
      fixture.detectChanges()

      const btn = fixture.debugElement.query(By.css('gn-ui-button'))
      expect(btn).not.toBeNull()
    })

    it('should call openEdit when edit button is clicked', () => {
      component.openEdit = jest.fn()
      component.canEdit$ = of(true)
      fixture.detectChanges()

      const btn = fixture.debugElement.query(By.css('gn-ui-button'))
      btn.triggerEventHandler('buttonClick', null)

      expect(component.openEdit).toHaveBeenCalled()
    })
  })

  describe('Favorite Star', () => {
    it('should not show the favorite star when auth features are disabled', () => {
      _supportsAuthentication = false
      component.metadata = { uniqueIdentifier: '123' } as any
      fixture.detectChanges()

      const favorite = fixture.debugElement.query(By.css('gn-ui-favorite-star'))
      expect(favorite).toBeNull()
    })

    it('should pass correct inputs to the favorite star', () => {
      component.metadata = { uniqueIdentifier: 'abc' } as any
      component.showLabel = true
      component.isMobile$ = of(false)
      fixture.detectChanges()

      const favoriteInstance = fixture.debugElement.query(
        By.css('gn-ui-favorite-star')
      ).componentInstance
      expect(favoriteInstance.record.uniqueIdentifier).toBe('abc')
      expect(favoriteInstance.displayLabel).toBe(true)
    })
  })

  describe('Language Switcher', () => {
    it('should show the language switcher based on showLanguageSwitcher', () => {
      component.showLanguageSwitcher = true
      fixture.detectChanges()

      const switcher = fixture.debugElement.query(
        By.css('gn-ui-language-switcher')
      )
      expect(switcher).not.toBeNull()
    })
  })

  describe('Styles', () => {
    it('should bind the color input to CSS variables', () => {
      const color = '#00ff00'
      component.canEdit$ = of(true)
      component.color = color
      fixture.detectChanges()

      const btn = fixture.debugElement.query(
        By.css('gn-ui-button')
      ).nativeElement
      expect(btn.style.getPropertyValue('--gn-ui-button-color')).toBe(color)
    })
  })
})
