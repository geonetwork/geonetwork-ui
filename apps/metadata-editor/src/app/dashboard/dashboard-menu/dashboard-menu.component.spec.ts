import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { BehaviorSubject, of } from 'rxjs'
import { DashboardFacade } from '../+state/dashboard.facade'
import { DashboardMenuComponent } from './dashboard-menu.component'
import clearAllMocks = jest.clearAllMocks

class DashboardFacadeMock {
  setActiveMenu = jest.fn()
  activeMenu$ = new BehaviorSubject('')
}

const translateServiceMock = {
  currentLang: 'fr',
}

describe('DashboardMenuComponent', () => {
  let component: DashboardMenuComponent
  let fixture: ComponentFixture<DashboardMenuComponent>
  let facade: DashboardFacadeMock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMenuComponent],
      providers: [
        { provide: DashboardFacade, useClass: DashboardFacadeMock },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) },
        },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    facade = TestBed.inject(DashboardFacade) as unknown as DashboardFacadeMock
    fixture = TestBed.createComponent(DashboardMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })
  afterEach(() => {
    clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('on menu click ', () => {
    let myOrg: DebugElement
    beforeEach(() => {
      myOrg = fixture.debugElement.queryAll(By.css('.menu-item'))[0]
      myOrg.nativeElement.click()
    })
    it('sets active menu', () => {
      expect(facade.setActiveMenu).toHaveBeenCalledTimes(1)
    })
  })

  describe('when a menu is active ', () => {
    let myOrg: DebugElement
    let catalog: DebugElement
    beforeEach(() => {
      facade.activeMenu$.next('my-org')
      fixture.detectChanges()
      myOrg = fixture.debugElement.queryAll(By.css('.menu-item'))[0]
      catalog = fixture.debugElement.queryAll(By.css('.menu-item'))[1]
    })
    it('add active class', () => {
      expect(myOrg.classes['btn-active']).toBeTruthy()
    })
    it('do not add active class to others menu', () => {
      expect(catalog.classes['btn-active']).toBeFalsy()
    })
  })
})
