import { TestBed } from '@angular/core/testing'
import { MdViewFacade } from '../state/mdview.facade'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/ui/search'
import { Subject } from 'rxjs'

import { LinkClassifierService } from './link-classifier.service'

const facadeMock = {
  metadata$: new Subject(),
} as any

describe('LinkClassifierService', () => {
  let service: LinkClassifierService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MdViewFacade,
          useValue: facadeMock,
        },
      ],
    })
    service = TestBed.inject(LinkClassifierService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('classify links', () => {
    let allLinks, otherLinks, dataLinks, validMapLinks
    beforeEach(() => {
      service.allLinks$.subscribe((links) => (allLinks = links))
      service.otherLinks$.subscribe((links) => (otherLinks = links))
      service.dataLinks$.subscribe((links) => (dataLinks = links))
      service.validMapLinks$.subscribe((links) => (validMapLinks = links))
      facadeMock.metadata$.next(RECORDS_FULL_FIXTURE[0])
    })
    it('all links', () => {
      expect(allLinks).toEqual(RECORDS_FULL_FIXTURE[0].links)
    })
    it('data links', () => {
      expect(dataLinks).toEqual([
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
    })
    it('other links', () => {
      expect(otherLinks).toEqual([
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
    it('valid map links', () => {
      expect(validMapLinks).toEqual([
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
    })
  })
})
