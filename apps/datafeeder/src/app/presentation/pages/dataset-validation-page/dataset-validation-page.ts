import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { LogService } from '@geonetwork-ui/util/shared'
import {
  AnalysisStatusEnumApiModel,
  BoundingBoxApiModel,
  DatasetUploadStatusApiModel,
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { WizardService } from '@geonetwork-ui/feature/editor'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import { fromExtent } from 'ol/geom/Polygon'
import { forkJoin, Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import SETTINGS from '../../../../settings'
import { config as wizardConfig } from '../../../configs/wizard.config'
import { DatafeederFacade } from '../../../store/datafeeder.facade'

const unknownLabel = 'datafeeder.datasetValidation.unknown'
const viewSrs = 'EPSG:3857'

marker('datafeeder.datasetValidation.unknown')
marker('datafeeder.validation.sample.title')
marker('datafeeder.validation.extent.title')
marker('datafeeder.validation.encoding')
marker('datafeeder.validation.projection')

@Component({
  selector: 'gn-ui-dataset-validation-page',
  templateUrl: './dataset-validation-page.html',
  styleUrls: ['./dataset-validation-page.css'],
})
export class DatasetValidationPageComponent implements OnInit, OnDestroy {
  encodingList = SETTINGS.encodings
  refSystem = [{ label: unknownLabel, value: '' }, ...SETTINGS.projections]

  geoJSONData: Record<string, unknown>
  geoJSONBBox: Record<string, unknown>

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
          if (job.status === AnalysisStatusEnumApiModel.Error) {
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
            this.geoJSONData = feature as Record<string, any> // No more precision in API
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
      .subscribe(
        (feature) => (this.geoJSONData = feature as Record<string, any>)
      )
  }

  handleCrsChange(crs) {
    this.crs = crs
    console.log(`CRS changed to «${crs}»`)
  }

  submitValidation() {
    if (!this.isValid()) {
      return
    }
    const fields = ['encoding', 'nativeName', 'crs']
    fields.forEach((f) => this.wizard.setWizardFieldData(f, this[f]))
    this.router.navigate(['/', this.rootId, 'step', 1])
  }

  isValid(): boolean {
    return !!this.crs
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }
}
