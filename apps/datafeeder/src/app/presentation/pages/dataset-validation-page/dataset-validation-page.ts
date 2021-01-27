import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@lib/common'
import {
  BoundingBoxApiModel,
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@lib/datafeeder-api'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { fromExtent } from 'ol/geom/Polygon'
import { forkJoin, Subscription } from 'rxjs'

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

  geoJSONData: object

  geoJSONBBox: object

  numOfEntities = 0
  private routeParamsSub: Subscription
  private rootId: number
  private format = new GeoJSON({})

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService,
    private fileUploadApiService: FileUploadApiService
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(({ id }) => {
      this.rootId = id
      this.fileUploadApiService
        .findUploadJob(id)
        .subscribe((job: UploadJobStatusApiModel) => {
          if (job.status === 'ERROR') {
            this.router.navigate(['/'], {
              relativeTo: this.activatedRoute,
              queryParams: { error: 'analysis' },
            })
            return
          }

          const dataset = job.datasets[0]
          this.numOfEntities = dataset.featureCount

          forkJoin([
            this.fileUploadApiService.getBounds(id, dataset.name),
            this.fileUploadApiService.getSampleFeature(id, dataset.name),
          ]).subscribe(([bbox, feature]) => {
            const { minx, miny, maxx, maxy, crs } = bbox as BoundingBoxApiModel
            this.geoJSONBBox = this.format.writeFeatureObject(
              new Feature({ geometry: fromExtent([minx, miny, maxx, maxy]) }),
              { dataProjection: crs.srs }
            )
            this.geoJSONData = feature as object // No more precision in API
          })
        })
    })
  }

  submitValidation() {
    this.router.navigate(['/', this.rootId, 'step', 1])
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
