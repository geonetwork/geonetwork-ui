import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PublishButtonComponent } from './publish-button.component'
import { EditorFacade } from '@geonetwork-ui/feature/editor'
import { BehaviorSubject, firstValueFrom, of } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'
import { HttpClientModule } from '@angular/common/http'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  GroupsApiService,
  RecordsApiService,
} from '@geonetwork-ui/data-access/gn4'
import { barbieUserFixture } from '@geonetwork-ui/common/fixtures'

class EditorFacadeMock {
  changedSinceSave$ = new BehaviorSubject(false)
  saving$ = new BehaviorSubject(false)
  activeUser$ = new BehaviorSubject({})
  record$ = new BehaviorSubject({
    ownerOrganization: { name: 'Group 1', id: 1 },
    uniqueIdentifier: 304,
  })
  saveRecord = jest.fn()
  saveSuccess$ = new BehaviorSubject(true)
}

const user = barbieUserFixture()
const groups = [
  { id: 1, name: 'Group 1' },
  { id: 2, name: 'Group 2' },
  { id: 3, name: 'Group 3' },
]

class PlatformServiceMock {
  getMe = jest.fn(() => new BehaviorSubject(user))
}

class GroupsApiServiceMock {
  getGroups = jest.fn().mockReturnValue(of(groups))
}

class RecordsApiServiceMock {
  setRecordOwnership = jest.fn().mockReturnValue(of({}))
}

describe('PublishButtonComponent', () => {
  let component: PublishButtonComponent
  let fixture: ComponentFixture<PublishButtonComponent>
  let facade: EditorFacadeMock
  let recordsApiService: RecordsApiService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PublishButtonComponent,
        TranslateModule.forRoot(),
        HttpClientModule,
      ],
      providers: [
        {
          provide: EditorFacade,
          useClass: EditorFacadeMock,
        },
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceMock,
        },
        {
          provide: GroupsApiService,
          useClass: GroupsApiServiceMock,
        },
        {
          provide: RecordsApiService,
          useClass: RecordsApiServiceMock,
        },
      ],
    }).compileComponents()

    recordsApiService = TestBed.inject(RecordsApiService)
    facade = TestBed.inject(EditorFacade) as any
    fixture = TestBed.createComponent(PublishButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('status$', () => {
    describe('saving', () => {
      beforeEach(() => {
        facade.saving$.next(true)
      })
      it('should return "saving" when saving', async () => {
        await expect(firstValueFrom(component.status$)).resolves.toBe('saving')
      })
    })
    describe('has changes', () => {
      beforeEach(() => {
        facade.changedSinceSave$.next(true)
      })
      it('should return "hasChanges" when not saving and changed', async () => {
        await expect(firstValueFrom(component.status$)).resolves.toBe(
          'hasChanges'
        )
      })
    })
    describe('up to date', () => {
      it('should return "upToDate" when not saving and not changed', async () => {
        await expect(firstValueFrom(component.status$)).resolves.toBe(
          'upToDate'
        )
      })
    })
  })

  describe('#saveRecord', () => {
    beforeEach(async () => {
      await component.saveRecord()
    })
    it('should call facade.saveRecord', () => {
      expect(facade.saveRecord).toHaveBeenCalled()
      expect(recordsApiService.setRecordOwnership).toHaveBeenCalledWith(
        304,
        0,
        46798
      )
    })
  })
  describe('#confirmPublish', () => {
    it('should call saveRecord', () => {
      const saveRecordSpy = jest.spyOn(component, 'saveRecord')
      component.confirmPublish()
      expect(saveRecordSpy).toHaveBeenCalled()
    })
  })

  describe('#cancelPublish', () => {
    it('should set isActionMenuOpen to false', () => {
      component.cancelPublish()
      expect(component.isActionMenuOpen).toBe(false)
    })
  })

  describe('#openConfirmationMenu', () => {
    it('should set isActionMenuOpen to true', () => {
      component.openConfirmationMenu()
      expect(component.isActionMenuOpen).toBe(true)
    })
  })

  describe('#publishRecord', () => {
    it('should call openConfirmationMenu if publishWarning has length', () => {
      component.publishWarning = ['Warning']
      const openConfirmationMenuSpy = jest.spyOn(
        component,
        'openConfirmationMenu'
      )
      component.publishRecord()
      expect(openConfirmationMenuSpy).toHaveBeenCalled()
    })

    it('should call saveRecord if publishWarning is empty', () => {
      component.publishWarning = []
      const saveRecordSpy = jest.spyOn(component, 'saveRecord')
      component.publishRecord()
      expect(saveRecordSpy).toHaveBeenCalled()
    })
  })
})
