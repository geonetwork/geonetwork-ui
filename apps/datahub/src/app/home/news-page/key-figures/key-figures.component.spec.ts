import { ComponentFixture, TestBed } from '@angular/core/testing'
import { KeyFiguresComponent } from './key-figures.component'
import { BehaviorSubject, of } from 'rxjs'
import { RecordsService } from '@geonetwork-ui/feature/catalog'
import { By } from '@angular/platform-browser'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { provideRouter } from '@angular/router'

const recordsCount$ = new BehaviorSubject(1234)
class RecordsServiceMock {
  recordsCount$ = recordsCount$
}

class OrganisationsServiceMock {
  organisationsCount$ = of(456)
}

describe('KeyFiguresComponent', () => {
  let component: KeyFiguresComponent
  let fixture: ComponentFixture<KeyFiguresComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideI18n(),
        {
          provide: RecordsService,
          useClass: RecordsServiceMock,
        },
        {
          provide: OrganizationsServiceInterface,
          useClass: OrganisationsServiceMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(KeyFiguresComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('recordsCount$', () => {
    let values
    beforeEach(() => {
      values = []
      component.recordsCount$.subscribe((v) => values.push(v))
    })
    it('starts with a placeholder value', () => {
      expect(values[0]).toBe('-')
    })
    it('emits the records count', () => {
      expect(values[1]).toBe(1234)
    })
    describe('when the request does not behave as expected', () => {
      beforeEach(() => {
        recordsCount$.error('blargz')
      })
      it('emits -', () => {
        let count
        component.recordsCount$.subscribe((v) => (count = v))
        expect(count).toBe('-')
      })
    })
  })

  describe('orgsCount$', () => {
    let values
    beforeEach(() => {
      values = []
      component.orgsCount$.subscribe((v) => values.push(v))
    })
    it('starts with a placeholder value', () => {
      expect(values[0]).toBe('-')
    })
    it('emits the orgs count', () => {
      expect(values[1]).toBe(456)
    })
  })
  describe('routerLinks', () => {
    let linkTags
    beforeEach(() => {
      linkTags = fixture.debugElement.queryAll(By.css('a'))
    })
    it('first href links to search route', () => {
      expect(linkTags[0].nativeElement.getAttribute('href')).toEqual(
        component.ROUTE_SEARCH
      )
    })
    it('second href links to organisations route', () => {
      expect(linkTags[1].nativeElement.getAttribute('href')).toEqual(
        component.ROUTE_ORGANISATIONS
      )
    })
  })
})
