import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LogService } from '@lib/common'
import {
  AnalysisStatusEnumApiModel,
  BoundingBoxApiModel,
  DatasetUploadStatusApiModel,
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@lib/datafeeder-api'
import { WizardService } from '@lib/editor'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { fromExtent } from 'ol/geom/Polygon'
import { forkJoin, Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import { environment } from '../../../../environments/environment'
import SETTINGS from '../../../../settings'
import { config as wizardConfig } from '../../../configs/wizard.config'
import { DatafeederFacade } from '../../../store/datafeeder.facade'

const unknownLabel = 'datafeeder.datasetValidation.unknown'
const viewSrs = 'EPSG:3857'

@Component({
  selector: 'app-dataset-validation-page',
  templateUrl: './dataset-validation-page.html',
  styleUrls: ['./dataset-validation-page.css'],
})
export class DatasetValidationPageComponent implements OnInit, OnDestroy {
  encodingList = SETTINGS.encodings
  refSystem = [{ label: unknownLabel, value: '' }, ...SETTINGS.projections]

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
  private nativeName = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private logService: LogService,
    private wizard: WizardService,
    private fileUploadApiService: FileUploadApiService,
    private facade: DatafeederFacade
  ) {}

  ngOnInit(): void {
    this.routeParamsSub = this.activatedRoute.params.subscribe(({ id }) => {
      this.rootId = id
      this.wizard.initialize(id, wizardConfig)
      this.numberOfSteps = this.wizard.getConfigurationStepNumber() + 1

      this.facade.upload$
        .pipe(take(1))
        .subscribe((job: UploadJobStatusApiModel) => {
          if (job.status === AnalysisStatusEnumApiModel.ERROR) {
            this.router.navigate(['/'], {
              relativeTo: this.activatedRoute,
              queryParams: { error: 'analysis' },
            })
            return
          }

          this.dataset = job.datasets[0]
          this.nativeName = this.dataset.name
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
    const fields = ['encoding', 'nativeName', 'crs']
    fields.forEach((f) => this.wizard.setWizardFieldData(f, this[f]))
    this.router.navigate(['/', this.rootId, 'step', 1])
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
