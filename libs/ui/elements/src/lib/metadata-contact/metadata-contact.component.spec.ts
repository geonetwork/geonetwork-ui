import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { MetadataContactComponent } from './metadata-contact.component'

describe('MetadataContactComponent', () => {
  let component: MetadataContactComponent
  let fixture: ComponentFixture<MetadataContactComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetadataContactComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataContactComponent)
    component = fixture.componentInstance
    component.metadata = {
      contact: {
        name: 'john',
        organisation: 'Worldcop',
        email: 'john@world.co',
        website: 'https://john.world.co',
      },
    } as any
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('on contact click', () => {
    beforeEach(() => {
      jest.resetAllMocks()
      jest.spyOn(component.contact, 'emit')
    })
    it('emit contact click with contact name', () => {
      const el = fixture.debugElement.query(
        By.css('.text-primary.font-title')
      ).nativeElement
      el.click()
      expect(component.contact.emit).toHaveBeenCalledWith('Worldcop')
    })
  })
  describe('content', () => {
    let ps
    beforeEach(() => {
      ps = fixture.debugElement.queryAll(By.css('p'))
    })
    it('displays the contact name', () => {
      const el = fixture.debugElement.query(
        By.css('.text-primary.font-title')
      ).nativeElement
      expect(el.innerHTML).toBe(' Worldcop ')
    })
    it('displays the contact email', () => {
      expect(ps[1].nativeElement.innerHTML).toBe('john@world.co')
    })
    it('displays a link to the contact website', () => {
      const a = fixture.debugElement.query(By.css('a'))
      expect(a.attributes.href).toBe('https://john.world.co')
      expect(a.attributes.target).toBe('_blank')
    })
  })
})
