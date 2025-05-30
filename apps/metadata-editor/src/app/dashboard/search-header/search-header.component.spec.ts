import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchHeaderComponent } from './search-header.component'
import { of } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { AvatarServiceInterface } from '@geonetwork-ui/api/repository'
import { SearchService } from '@geonetwork-ui/feature/search'
import { MockBuilder, MockProvider, MockProviders } from 'ng-mocks'
import { RouterFacade } from '@geonetwork-ui/feature/router'

describe('SearchHeaderComponent', () => {
  let component: SearchHeaderComponent
  let fixture: ComponentFixture<SearchHeaderComponent>

  beforeEach(() => MockBuilder(SearchHeaderComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProviders(
          AvatarServiceInterface,
          PlatformServiceInterface,
          SearchService
        ),
        MockProvider(RouterFacade, {
          currentRoute$: of(null),
        }),
      ],
    })
      .overrideComponent(SearchHeaderComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(SearchHeaderComponent)
    component = fixture.componentInstance
    component.activeBtn = true
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
