import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ExternalLinkCardComponent } from './external-link-card.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('ExternalLinkCardComponent', () => {
  let component: ExternalLinkCardComponent
  let fixture: ComponentFixture<ExternalLinkCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideI18n()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalLinkCardComponent)
    component = fixture.componentInstance
    component.link = {
      name: 'Consulter sur Géoclip',
      description:
        'Lorem ipsum dolor sit amet, consect etur adipiscing elit. Donec id condim entum ex. Etiam sed molestie est.',
      url: new URL('https://example.com/someurlpath'),
      type: 'link',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
