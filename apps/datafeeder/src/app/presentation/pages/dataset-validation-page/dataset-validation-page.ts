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

  geoJSONData = [
    {
      type: 'Feature',
      geometry: {
        type: 'GeometryCollection',
        geometries: [
          {
            type: 'LineString',
            coordinates: [
              [-5e6, -5e6],
              [0, -5e6],
            ],
          },
          {
            type: 'Point',
            coordinates: [4e6, -5e6],
          },
          {
            type: 'Polygon',
            coordinates: [
              [
                [1e6, -6e6],
                [2e6, -4e6],
                [3e6, -6e6],
              ],
            ],
          },
        ],
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'MultiLineString',
        coordinates: [
          [
            [-1e6, -7.5e5],
            [-1e6, 7.5e5],
          ],
          [
            [1e6, -7.5e5],
            [1e6, 7.5e5],
          ],
          [
            [-7.5e5, -1e6],
            [7.5e5, -1e6],
          ],
          [
            [-7.5e5, 1e6],
            [7.5e5, 1e6],
          ],
        ],
      },
    },
  ]

  numOfEntities = 1549
  private routeParamsSub: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(({ id }) => {
      this.logService.log(`id: ${id}`)
    })
  }

  submitValidation() {}

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
