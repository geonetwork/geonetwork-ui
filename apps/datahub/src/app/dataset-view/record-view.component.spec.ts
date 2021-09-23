import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MdViewFacade } from '@geonetwork-ui/feature/search'
import {
  MetadataInfoComponent,
  UiElementsModule,
} from '@geonetwork-ui/ui/elements'
import {
  RECORDS_FULL_FIXTURE,
  RECORDS_SUMMARY_FIXTURE,
} from '@geonetwork-ui/ui/search'
import { BehaviorSubject } from 'rxjs'

import { RecordViewComponent } from './record-view.component'

class MdViewFacadeMock {
  isPresent$ = new BehaviorSubject(false)
  metadata$ = new BehaviorSubject(RECORDS_SUMMARY_FIXTURE[0])
}

describe('DatasetViewComponent', () => {
  let component: RecordViewComponent
  let fixture: ComponentFixture<RecordViewComponent>
  let facade

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordViewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [UiElementsModule],
      providers: [
        {
          provide: MdViewFacade,
          useClass: MdViewFacadeMock,
        },
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('if metadata present', () => {
    beforeEach(() => {
      facade.isPresent$.next(true)
      fixture.detectChanges()
    })
    it('shows the full metadata', () => {
      const dumb = fixture.debugElement.query(
        By.directive(MetadataInfoComponent)
      ).componentInstance
      expect(dumb.metadata).toHaveProperty('abstract')
    })
  })
  describe('if metadata not present', () => {
    beforeEach(() => {
      facade.isPresent$.next(false)
      fixture.detectChanges()
    })
    it('shows a placeholder', () => {
      const dumb = fixture.debugElement.query(
        By.directive(MetadataInfoComponent)
      ).componentInstance
      expect(dumb.metadata).not.toHaveProperty('abstract')
      expect(dumb.incomplete).toBeTruthy()
    })
  })

  describe('metadata links', () => {
    let mdPageComponent: MetadataInfoComponent
    describe('full metadata', () => {
      beforeEach(() => {
        facade.isPresent$.next(true)
        facade.metadata$.next(RECORDS_FULL_FIXTURE[0])
        fixture.detectChanges()
        mdPageComponent = fixture.debugElement.query(
          By.directive(MetadataInfoComponent)
        ).componentInstance
      })
      it('filters out links with and without usage', () => {
        expect(mdPageComponent.dataLinks).toEqual([
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point',
            protocol: 'OGC:WMS',
            url: 'https://www.ifremer.fr/services/wms/surveillance_littorale',
          },
          {
            description: 'Lieu de surveillance (point)',
            name: 'surval_parametre_point',
            protocol: 'OGC:WFS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone',
            protocol: 'OGC:WMS',
            url: 'https://www.ifremer.fr/services/wms/surveillance_littorale',
          },
          {
            description: 'Lieu de surveillance (polygone)',
            name: 'surval_parametre_polygone',
            protocol: 'OGC:WFS',
            url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
          },
        ])
        expect(mdPageComponent.otherLinks).toEqual([
          {
            description: "Extraction des données d'observation",
            name: 'r:survalextraction',
            protocol: 'OGC:WPS',
            url: 'https://www.ifremer.fr/services/wps/surval',
          },
          {
            description: "Extraction des données d'observation",
            name: 'r:survalextraction',
            protocol: 'OGC:WPS',
            url: 'https://www.ifremer.fr/services/wps/surval',
          },
          {
            description: '',
            name: 'La base de données Quadrige',
            protocol: 'WWW:LINK',
            url: 'http://envlit.ifremer.fr/resultats/quadrige',
          },
          {
            description: '',
            name: 'La surveillance du milieu marin et côtier',
            protocol: 'WWW:LINK-1.0-http--link',
            url: 'http://envlit.ifremer.fr/surveillance/presentation',
          },
          {
            description:
              'Manuel pour l’utilisation des données REPHY. Informations destinées à améliorer la compréhension des fichiers de données REPHY mis à disposition des scientifiques et du public. ODE/VIGIES/17-15. Ifremer, ODE/VIGIES, Coordination REPHY & Cellule Quadrige (2017).',
            name: 'Manuel pour l’utilisation des données REPHY',
            protocol: 'WWW:LINK',
            url: 'http://archimer.ifremer.fr/doc/00409/52016/',
          },
          {
            description: 'DOI du jeu de données',
            name: 'DOI du jeu de données',
            protocol: 'WWW:LINK-1.0-http--metadata-URL',
            url: 'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          },
        ])
      })
    })
    describe('summary metadata', () => {
      beforeEach(() => {
        facade.isPresent$.next(true)
        fixture.detectChanges()
        mdPageComponent = fixture.debugElement.query(
          By.directive(MetadataInfoComponent)
        ).componentInstance
      })
      it('leaves links as empty arrays', () => {
        expect(mdPageComponent.dataLinks).toEqual([])
        expect(mdPageComponent.otherLinks).toEqual([])
      })
    })
  })
})
