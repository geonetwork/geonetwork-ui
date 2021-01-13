import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@lib/common'

@Component({
  selector: 'app-dataset-validation-page',
  templateUrl: './dataset-validation-page.html',
  styleUrls: ['./dataset-validation-page.css'],
})
export class DatasetValidationPageComponent implements OnInit, OnDestroy {
  encodingList = [
    {
      label: 'UTF8',
      value: 'UTF8',
    },
  ]

  refSystem = [
    {
      label: 'Lambert 93',
      value: 'Lambert93',
    },
  ]

  geoJSONData = {
    type: 'Feature',
    properties: {
      id_circuit: 'P1',
      nom: 'Balcons dAllonnes',
      commune: 'Allonnes',
      niveau: 'Très facile',
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [-0.4119873046875, 47.28295557691231],
        [-0.02197265625, 47.368594345213374],
        [0.06042480468749999, 47.352780247239586],
        [0.08651733398437499, 47.33975331313596],
        [0.11947631835937499, 47.34068391504694],
        [0.1373291015625, 47.342545069660225],
        [0.1483154296875, 47.342545069660225],
        [0.15106201171874997, 47.336961408985005],
        [0.160675048828125, 47.333238640473475],
        [0.17303466796874997, 47.32672316405057],
        [0.182647705078125, 47.32393057095941],
        [0.193634033203125, 47.320206883852414],
        [0.22933959960937503, 47.32393057095941],
        [0.2362060546875, 47.32858481076006],
        [0.256805419921875, 47.33510005753559],
        [0.2691650390625, 47.34068391504694],
        [0.278778076171875, 47.331377157798244],
        [0.296630859375, 47.309965390979684],
        [0.3131103515625, 47.292270864380086],
        [0.306243896484375, 47.28388717948357],
        [0.29937744140625, 47.277365616965646],
        [0.296630859375, 47.2736386488847],
        [0.276031494140625, 47.259660180700735],
        [0.254058837890625, 47.25406775981567],
        [0.23345947265625, 47.2447457457832],
        [0.19775390625, 47.23915174981453],
        [0.17990112304687497, 47.23915174981453],
        [0.16204833984375, 47.23915174981453],
        [0.152435302734375, 47.23728695323144],
        [0.141448974609375, 47.220500830563616],
        [0.133209228515625, 47.21117290969667],
        [0.12908935546875, 47.20370939156941],
        [0.11398315429687499, 47.194378517083486],
        [0.10711669921875, 47.187845928576344],
        [0.094757080078125, 47.18597932702905],
        [0.070037841796875, 47.1813125359862],
        [0.05630493164062499, 47.17757880776958],
        [0.039825439453125, 47.17477833929903],
        [0.01922607421875, 47.16637604771991],
        [-0.05630493164062499, 47.127147777248645],
      ],
    },
  }

  geoJSONBBox = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [100.0, 0.0],
          [101.0, 0.0],
          [101.0, 1.0],
          [100.0, 1.0],
          [100.0, 0.0],
        ],
      ],
    },
  }

  numOfEntities = 1549
  private routeParamsSub: Subscription
  private rootId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(({ id }) => {
      this.logService.log(`id: ${id}`)
      this.rootId = id
    })
  }

  submitValidation() {
    this.router.navigate(['/', this.rootId, 'step', 1])
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
