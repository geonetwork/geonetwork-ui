import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateService } from '@ngx-translate/core'

import { ChipsInputComponent } from './chips-input.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TagInputModule } from 'ngx-chips'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

class TranslateServiceMock {
  currentLang = 'en'
}

const VALUES_RESPONSE = [
  {
    values: { eng: 'Addresses' },
    definitions: {
      eng: 'Location of properties based on address identifiers, usually by road name, house number, postal code.',
    },
    coordEast: '',
    coordWest: '',
    coordSouth: '',
    coordNorth: '',
    thesaurusKey: 'external.theme.httpinspireeceuropaeutheme-theme',
    value: 'Addresses',
    definition:
      'Location of properties based on address identifiers, usually by road name, house number, postal code.',
    uri: 'http://inspire.ec.europa.eu/theme/ad',
  },
  {
    values: { eng: 'Administrative units' },
    definitions: {
      eng: 'Units of administration, dividing areas where Member States have and/or exercise jurisdictional rights, for local, regional and national governance, separated by administrative boundaries.',
    },
    coordEast: '',
    coordWest: '',
    coordSouth: '',
    coordNorth: '',
    thesaurusKey: 'external.theme.httpinspireeceuropaeutheme-theme',
    value: 'Administrative units',
    definition:
      'Units of administration, dividing areas where Member States have and/or exercise jurisdictional rights, for local, regional and national governance, separated by administrative boundaries.',
    uri: 'http://inspire.ec.europa.eu/theme/au',
  },
  {
    values: { eng: 'Agricultural and aquaculture facilities' },
    definitions: {
      eng: 'Farming equipment and production facilities (including irrigation systems, greenhouses and stables).',
    },
    coordEast: '',
    coordWest: '',
    coordSouth: '',
    coordNorth: '',
    thesaurusKey: 'external.theme.httpinspireeceuropaeutheme-theme',
    value: 'Agricultural and aquaculture facilities',
    definition:
      'Farming equipment and production facilities (including irrigation systems, greenhouses and stables).',
    uri: 'http://inspire.ec.europa.eu/theme/af',
  },
]

describe('ChipsInputComponent', () => {
  let component: ChipsInputComponent
  let fixture: ComponentFixture<ChipsInputComponent>
  let httpController: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipsInputComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        TagInputModule,
        NoopAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
      ],
    }).compileComponents()
    httpController = TestBed.inject(HttpTestingController)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsInputComponent)
    component = fixture.componentInstance
    component.url = (search) => `http://my.registries.org/list/q=${search}`
    component.loadOnce = true
  })

  it('should create', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  describe('options loading', () => {
    let items
    beforeEach(() => {
      fixture.detectChanges()
      component.ngOnInit()
      component.requestAutocompleteItems('hello').subscribe((v) => (items = v))
      const req = httpController.expectOne('http://my.registries.org/list/q=*')
      req.flush(VALUES_RESPONSE)
    })

    it('shows the available options', () => {
      expect(items).toEqual([
        'Addresses',
        'Administrative units',
        'Agricultural and aquaculture facilities',
      ])
    })

    afterEach(() => {
      httpController.verify()
    })
  })
})
