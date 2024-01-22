import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  AnalysisStatusEnumApiModel,
  DatasetUploadStatusApiModel,
  FileUploadApiService,
  UploadJobStatusApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { WizardService } from '@geonetwork-ui/feature/editor'
import GeoJSON from 'ol/format/GeoJSON'
import { Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import { config as wizardConfig } from '../../../configs/wizard.config'
import { DatafeederFacade } from '../../../store/datafeeder.facade'
import * as Papa from 'papaparse'
import { DropdownChoice } from '@geonetwork-ui/ui/inputs'

const unknownLabel = 'datafeeder.datasetValidation.unknown'
const viewSrs = 'EPSG:3857'

marker('datafeeder.datasetValidation.unknown')
marker('datafeeder.validation.sample.title')
marker('datafeeder.validation.extent.title')
marker('datafeeder.validation.extent.title.unknown')
marker('datafeeder.validation.encoding')
marker('datafeeder.validation.projection')
marker('datafeeder.validation.projection.unknown')

@Component({
  selector: 'gn-ui-dataset-validation-csv-page',
  templateUrl: './dataset-validation-csv-page.html',
  styleUrls: ['./dataset-validation-csv-page.css'],
})
export class DatasetValidationCsvPageComponent implements OnInit, OnDestroy {
  dataset: DatasetUploadStatusApiModel

  encoding: string
  nativeName: string

  numOfEntities = 0
  numberOfSteps: number

  csvData: []
  csvDelimiter: string
  delimiterChoices: DropdownChoice[] = [
    { label: 'Comma ( , )', value: ',' },
    { label: 'Semicolon ( ; )', value: ';' },
  ]
  quoteSeparator: string
  quoteSeparatorChoices: DropdownChoice[] = [
    { label: 'None', value: '' },
    { label: "Simple quote ( ' )", value: "'" },
    { label: 'Double quote ( " )', value: '"' },
  ]
  columnTypes: string[]

  columnTypesChoices: DropdownChoice[] = [
    { label: 'String', value: 'STRING' },
    { label: 'Boolean', value: 'BOOL' },
    { label: 'Number', value: 'NUMBER' },
    { label: 'Lat', value: 'LAT' },
    { label: 'Lon', value: 'LON' },
    { label: 'Unknown', value: 'UNKNOWN' },
  ]
  private csv: string
  private routeParamsSub: Subscription
  private rootId: number
  private format = new GeoJSON({})
  latDuplicate: boolean
  longDuplicate: boolean
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
          const options = this.dataset.options
          this.csv = options.csv
          this.csvDelimiter =
            this.wizard.getWizardFieldData('csvDelimiter') || options.delimiter
          this.quoteSeparator =
            this.wizard.getWizardFieldData('quoteSeparator') ||
            options.quoteSeparator
          this.columnTypes =
            this.wizard.getWizardFieldData('columnTypes') || options.columnTypes
          this.numOfEntities = this.dataset.featureCount
          this.nativeName = this.dataset.name
          this.updateArray()
        })
    })
  }

  submitValidation() {
    if (!this.isValid()) {
      return
    }
    const fields = [
      'csvDelimiter',
      'quoteSeparator',
      'columnTypes',
      'nativeName',
    ]
    fields.forEach((f) => this.wizard.setWizardFieldData(f, this[f]))
    this.router.navigate(['/', this.rootId, 'step', 1])
  }

  updateArray(): void {
    const parseResult = Papa.parse(this.csv, {
      delimiter: this.csvDelimiter,
      quoteChar: this.quoteSeparator,
    })
    this.csvData = parseResult.data
  }

  isValid(): boolean {
    return !(
      this.latDuplicate ||
      this.longDuplicate ||
      this.columnTypes.indexOf('UNKNOWN') != -1
    )
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe()
  }

  selectDelimiter($event: string) {
    this.csvDelimiter = $event
    this.updateArray()
  }
  selectQuoteSeparator($event: string) {
    this.quoteSeparator = $event
    this.updateArray()
  }

  selectColumnTypes($event: string, index: number) {
    const copy = [...this.columnTypes]
    copy[index] = $event
    this.columnTypes = [...copy]
    this.latDuplicate =
      this.columnTypes.filter((val) => val == 'LAT').length > 1
    this.longDuplicate =
      this.columnTypes.filter((val) => val == 'LON').length > 1
    this.updateArray()
  }

  isDropdownValid(val: string) {
    return (this.latDuplicate && val === 'LAT') ||
      (this.longDuplicate && val === 'LON') ||
      val === 'UNKNOWN'
      ? '!border-red-600'
      : ''
  }
}
