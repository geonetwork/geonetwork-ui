import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldContactsComponent } from './form-field-contacts.component'
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { BehaviorSubject, of } from 'rxjs'
import {
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'
import { MockBuilder, MockInstance, MockProvider } from 'ng-mocks'
import {
  barbieIncOrganizationFixture,
  barbieUserFixture,
  someIndividualsFixture,
  someOrganizationsFixture,
  someUsersFixture,
} from '@geonetwork-ui/common/fixtures'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('FormFieldContactsComponent', () => {
  MockInstance.scope()

  let component: FormFieldContactsComponent
  let fixture: ComponentFixture<FormFieldContactsComponent>
  let platformServiceInterface: PlatformServiceInterface
  let organizationsServiceInterface: OrganizationsServiceInterface
  let changeDetectorRef: ChangeDetectorRef

  beforeEach(() => {
    return MockBuilder(FormFieldContactsComponent)
  })

  const mockUsers = someUsersFixture()

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProvider(OrganizationsServiceInterface),
        MockProvider(PlatformServiceInterface, {
          getUsers: jest.fn().mockReturnValue(of(mockUsers)),
        }),
        MockProvider(ChangeDetectorRef, {
          markForCheck: jest.fn().mockReturnValue({}),
        }),
      ],
    }).overrideComponent(FormFieldContactsComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default,
      },
    })

    fixture = TestBed.createComponent(FormFieldContactsComponent)
    component = fixture.componentInstance

    changeDetectorRef = TestBed.inject(ChangeDetectorRef)
    platformServiceInterface = TestBed.inject(PlatformServiceInterface)
    organizationsServiceInterface = TestBed.inject(
      OrganizationsServiceInterface
    )

    organizationsServiceInterface.organisations$ = new BehaviorSubject(
      someOrganizationsFixture()
    )

    component.value = []

    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  describe('ngOnChanges', () => {
    it('should initialize allOrganizations on first change', async () => {
      const orgs: Organization[] = [{ name: 'Org1' }, { name: 'Org2' }]
      organizationsServiceInterface.organisations$ = of(orgs)

      component.value = []
      await component.ngOnChanges({
        value: {
          currentValue: [],
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true,
        },
      })

      expect(component.allOrganizations.size).toBe(2)
      expect(component.allOrganizations.get('Org1')).toEqual({ name: 'Org1' })
      expect(component.allOrganizations.get('Org2')).toEqual({ name: 'Org2' })
    })

    it('should update contacts and mark for check when value changes', async () => {
      jest.spyOn(component, 'updateContacts')

      component.value = []
      await component.ngOnChanges({
        value: {
          currentValue: [],
          previousValue: null,
          firstChange: false,
          isFirstChange: () => false,
        },
      })

      expect(component.updateContacts).toHaveBeenCalled()
    })
  })

  describe('updateContacts', () => {
    beforeEach(async () => {
      await component.ngOnChanges({
        value: {
          currentValue: [],
          previousValue: undefined,
          firstChange: true,
          isFirstChange: () => true,
        },
      })
    })

    it('should update contacts with complete organization data', () => {
      component.value = [
        {
          ...someIndividualsFixture()[0],
          organization: { name: barbieIncOrganizationFixture().name },
        },
        {
          ...someIndividualsFixture()[1],
          organization: { name: barbieIncOrganizationFixture().name },
        },
      ]

      component.updateContacts()

      expect(component.contacts.length).toBe(2)
      expect(component.contacts[0].organization).toEqual(
        barbieIncOrganizationFixture()
      )
      expect(component.contacts[1].organization).toEqual(
        barbieIncOrganizationFixture()
      )
    })
  })

  describe('handleContactsChanged', () => {
    it('should update contacts and emit valueChange', () => {
      const contacts: Individual[] = someIndividualsFixture()
      jest.spyOn(component.valueChange, 'emit')

      component.handleContactsChanged(contacts)

      expect(component.contacts).toEqual(contacts)
      expect(component.valueChange.emit).toHaveBeenCalledWith(contacts)
    })
  })

  describe('addContact', () => {
    it('should add the contact and emit new contacts', () => {
      const spy = jest.spyOn(component.valueChange, 'emit')
      const mockUser = barbieUserFixture()
      component.allOrganizations.set('Org1', { name: 'Org1' } as Organization)

      component.addContact(mockUser)

      expect(spy).toHaveBeenCalledWith([
        {
          address: '',
          email: 'barbie@email.org',
          firstName: 'Barbara',
          lastName: 'Roberts',
          organization: { name: 'Barbie Inc.' } as Organization,
          phone: '',
          position: '',
          role: 'point_of_contact',
        },
      ])
    })
  })

  describe('ngOnDestroy', () => {
    it('should unsubscribe from subscriptions', () => {
      jest.spyOn(component.subscription, 'unsubscribe')

      component.ngOnDestroy()

      expect(component.subscription.unsubscribe).toHaveBeenCalled()
    })
  })
})
