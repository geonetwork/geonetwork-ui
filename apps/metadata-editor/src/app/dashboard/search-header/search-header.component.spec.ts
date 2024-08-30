import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchHeaderComponent } from './search-header.component'
import { BehaviorSubject, of } from 'rxjs'
import { barbieUserFixture } from '@geonetwork-ui/common/fixtures'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { TranslateModule } from '@ngx-translate/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { AvatarServiceInterface } from '@geonetwork-ui/api/repository'

class AvatarServiceInterfaceMock {
  getPlaceholder = () => of('http://placeholder.com')
  getProfileIcon = (hash: string) => of(`${hash}`)
}

const me$ = new BehaviorSubject(barbieUserFixture())
class PlatformServiceMock {
  getMe = jest.fn(() => me$)
}

describe('SearchHeaderComponent', () => {
  let component: SearchHeaderComponent
  let fixture: ComponentFixture<SearchHeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchHeaderComponent,
        EffectsModule.forRoot(),
        StoreModule.forRoot({}),
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
      providers: [
        {
          provide: AvatarServiceInterface,
          useClass: AvatarServiceInterfaceMock,
        },
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceMock,
        },
      ],
    })
      .overrideComponent(SearchHeaderComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
          imports: [],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(SearchHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
