import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@lib/common'
import {
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@lib/datafeeder-api'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import WKT from 'ol/format/WKT'
import { fromExtent } from 'ol/geom/Polygon'
import { Subscription } from 'rxjs'

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

  numOfEntities: number = 0
  private routeParamsSub: Subscription
  private rootId: number
  private format = new GeoJSON()
  private formatWKT = new WKT()

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
          if (job.status == 'ERROR') {
            this.router.navigate(['/'], {
              relativeTo: this.activatedRoute,
              queryParams: { error: 'analysis' },
            })
            return
          }

          const dataset = job.datasets[0]
          const { minx, miny, maxx, maxy, crs } = dataset.nativeBounds

          this.geoJSONBBox = this.format.writeFeatureObject(
            new Feature({ geometry: fromExtent([minx, miny, maxx, maxy]) }),
            { dataProjection: crs.srs }
          )
          this.geoJSONData = this.format.writeFeatureObject(
            new Feature({
              ...Object.fromEntries(
                dataset.sampleProperties.map(o => [o.name, o.value])
              ),
              geometry: this.formatWKT.readGeometry(dataset.sampleGeometryWKT),
            })
          )
          this.numOfEntities = dataset.featureCount
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
