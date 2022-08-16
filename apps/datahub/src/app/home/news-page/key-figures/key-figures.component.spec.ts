import { ComponentFixture, TestBed } from '@angular/core/testing'
import { KeyFiguresComponent } from './key-figures.component'
import { of } from 'rxjs'
import {
  OrganisationsService,
  RecordsService,
} from '@geonetwork-ui/feature/catalog'
import { TranslateModule } from '@ngx-translate/core'
import { NO_ERRORS_SCHEMA } from '@angular/core'

class RecordsServiceMock {
  recordsCount$ = of(1234)
}

class OrganisationsServiceMock {
  countOrganisations = () => of(456)
}

describe('KeyFiguresComponent', () => {
  let component: KeyFiguresComponent
  let fixture: ComponentFixture<KeyFiguresComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyFiguresComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: RecordsService,
          useClass: RecordsServiceMock,
        },
        {
          provide: OrganisationsService,
          useClass: OrganisationsServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
})
