import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@lib/common'
import {
  BoundingBoxApiModel,
  FileUploadApiService,
  UploadJobStatusApiModel,
  AnalysisStatusEnumApiModel,
  DatasetUploadStatusApiModel,
} from '@lib/datafeeder-api'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { fromExtent } from 'ol/geom/Polygon'
import { transformExtent } from 'ol/proj'
import { forkJoin, Subscription } from 'rxjs'
import { WizardService } from '@lib/editor'
import { environment } from '../../../../environments/environment'

const unknownLabel = 'datafeeder.datasetValidation.unknown'
const viewSrs = 'EPSG:3857'

@Component({
  selector: 'app-dataset-validation-page',
  templateUrl: './dataset-validation-page.html',
  styleUrls: ['./dataset-validation-page.css'],
})
export class DatasetValidationPageComponent implements OnInit, OnDestroy {
  encodingList = environment.encodings
  refSystem = [{ label: unknownLabel, value: '' }, ...environment.projections]

  geoJSONData: object
  geoJSONBBox: object

  dataset: DatasetUploadStatusApiModel

  featureIndex = 0
  crs = ''
  encoding = ''
  numOfEntities = 0
  numberOfSteps: number

  private routeParamsSub: Subscription
  private rootId: number
  private format = new GeoJSON({})

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService,
    private fileUploadApiService: FileUploadApiService,
    private wizard: WizardService
  ) {}

  ngOnInit(): void {
    this.numberOfSteps = this.wizard.getConfigurationStepNumber() + 1
    this.routeParamsSub = this.activatedRoute.params.subscribe(({ id }) => {
      this.rootId = id
      this.fileUploadApiService
        .findUploadJob(id)
        .subscribe((job: UploadJobStatusApiModel) => {
          if (job.status === AnalysisStatusEnumApiModel.ERROR) {
            this.router.navigate(['/'], {
              relativeTo: this.activatedRoute,
              queryParams: { error: 'analysis' },
            })
            return
          }

          this.dataset = job.datasets[0]
          this.numOfEntities = this.dataset.featureCount
          this.crs = this.dataset.nativeBounds?.crs?.srs
          this.encoding = this.dataset.encoding
          if (this.crs) {
            this.refSystem = []
          }

          forkJoin([
            this.fileUploadApiService.getBounds(
              id,
              this.dataset.name,
              viewSrs,
              true
            ),
            this.fileUploadApiService.getSampleFeature(
              id,
              this.dataset.name,
              this.featureIndex,
              undefined,
              viewSrs,
              true
            ),
          ]).subscribe(([bbox, feature]) => {
            const { minx, miny, maxx, maxy } = bbox as BoundingBoxApiModel
            this.geoJSONBBox = this.format.writeFeatureObject(
              new Feature({ geometry: fromExtent([minx, miny, maxx, maxy]) }),
              { featureProjection: viewSrs }
            )
            this.geoJSONData = feature as object // No more precision in API
          })
        })
    })
  }

  handleEncodingChange(encoding) {
    this.fileUploadApiService
      .getSampleFeature(
        this.rootId.toString(),
        this.dataset.name,
        this.featureIndex,
        encoding
      )
      .subscribe((feature) => (this.geoJSONData = feature))
  }

  handleCrsChange(crs) {
    console.log(`CRS changed to «${crs}»`)
  }

  submitValidation() {
    this.router.navigate(['/', this.rootId, 'step', 1])
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
