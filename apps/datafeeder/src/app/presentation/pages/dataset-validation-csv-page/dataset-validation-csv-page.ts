import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  AnalysisStatusEnumApiModel,
  DatasetUploadStatusApiModel,
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

marker('datafeeder.validation.csv.delimiter.comma')
marker('datafeeder.validation.csv.delimiter.semicolon')
marker('datafeeder.validation.csv.quote.none')
marker('datafeeder.validation.csv.quote.simple')
marker('datafeeder.validation.csv.quote.double')
marker('datafeeder.validation.csv.types.string')
marker('datafeeder.validation.csv.types.boolean')
marker('datafeeder.validation.csv.types.number')
marker('datafeeder.validation.csv.types.lat')
marker('datafeeder.validation.csv.types.lon')
marker('datafeeder.validation.csv.types.unknown')

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
    { label: 'datafeeder.validation.csv.delimiter.comma', value: ',' },
    { label: 'datafeeder.validation.csv.delimiter.semicolon', value: ';' },
  ]
  quoteChar: string
  quoteCharChoices: DropdownChoice[] = [
    { label: 'datafeeder.validation.csv.quote.none', value: '' },
    { label: 'datafeeder.validation.csv.quote.simple', value: "'" },
    { label: 'datafeeder.validation.csv.quote.double', value: '"' },
  ]
  columnTypes: string[]

  columnTypesChoices: DropdownChoice[] = [
    { label: 'datafeeder.validation.csv.types.string', value: 'STRING' },
    { label: 'datafeeder.validation.csv.types.boolean', value: 'BOOL' },
    { label: 'datafeeder.validation.csv.types.number', value: 'NUMBER' },
    { label: 'datafeeder.validation.csv.types.lat', value: 'LAT' },
    { label: 'datafeeder.validation.csv.types.lon', value: 'LON' },
    { label: 'datafeeder.validation.csv.types.unknown', value: 'UNKNOWN' },
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
          this.csv = atob(options.csv)
          this.csvDelimiter =
            this.wizard.getWizardFieldData('csvDelimiter') || options.delimiter
          this.quoteChar =
            this.wizard.getWizardFieldData('quoteChar') || options.quoteChar
          this.columnTypes =
            this.wizard.getWizardFieldData('columnTypes') ||
            options.columnTypes.split(',')
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
    const fields = ['csvDelimiter', 'quoteChar', 'columnTypes', 'nativeName']
    fields.forEach((f) => this.wizard.setWizardFieldData(f, this[f]))
    this.router.navigate(['/', this.rootId, 'step', 1])
  }

  updateArray(): void {
    const parseResult = Papa.parse(this.csv, {
      delimiter: this.csvDelimiter,
      quoteChar: this.quoteChar,
    })
    this.csvDelimiter ??= parseResult.meta.delimiter
    this.quoteChar ??= parseResult.meta.quoteChar
    console.log(parseResult.meta)
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
  selectQuoteChar($event: string) {
    this.quoteChar = $event
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
