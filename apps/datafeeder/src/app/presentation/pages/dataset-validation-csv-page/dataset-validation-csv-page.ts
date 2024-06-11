import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  AnalysisStatusEnumApiModel,
  DatasetUploadStatusApiModel,
  UploadJobStatusApiModel,
} from '@geonetwork-ui/data-access/datafeeder'
import { WizardService } from '@geonetwork-ui/feature/editor'
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
  latLngChoices: DropdownChoice[] = []
  latField: string
  lngField: string
  latLngValid: boolean

  private csv: string
  private routeParamsSub: Subscription
  rootId: number
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
          this.csv = new TextDecoder().decode(this.base64ToBytes(options.csv))
          this.csvDelimiter =
            this.wizard.getWizardFieldData('csvDelimiter') || options.delimiter
          this.quoteChar =
            this.wizard.getWizardFieldData('quoteChar') || options.quoteChar

          this.latField = this.wizard.getWizardFieldData('latField')

          this.lngField = this.wizard.getWizardFieldData('lngField')

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
      'quoteChar',
      'nativeName',
      'crs',
      'latField',
      'lngField',
    ]
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

    this.latLngChoices = [
      { value: '', label: 'datafeeder.validation.csv.quote.none' },
      ...parseResult.data[0].map((o) => ({
        label: o,
        value: o,
      })),
    ]
    // remove empty rows
    this.csvData = parseResult.data.filter(
      (row) => row.length > 1 || (row.length == 1 && row[0])
    )

    this.latLngValid =
      (!this.latField && !this.lngField) ||
      (this.latField &&
        this.lngField &&
        this.checkLatLongValues() &&
        this.latField !== this.lngField)
  }

  checkLatLongValues(): boolean {
    let latIndex = -1
    let lngIndex = -1
    return this.csvData.every((row: [string], index) => {
      if (index == 0) {
        latIndex = row.indexOf(this.latField)
        lngIndex = row.indexOf(this.lngField)
        return true
      }
      const lat = Number(row[latIndex])
      const lng = Number(row[lngIndex])
      return (
        !isNaN(lng) &&
        lng >= -180 &&
        lng <= 180 &&
        !isNaN(lat) &&
        lat >= -90 &&
        lat <= 90
      )
    })
  }

  isValid(): boolean {
    return this.latLngValid
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

  selectLatLng($event: string, lat: boolean) {
    if (lat) {
      this.latField = $event
    } else {
      this.lngField = $event
    }
    this.updateArray()
  }

  base64ToBytes(base64) {
    const binString = atob(base64)
    return Uint8Array.from(binString, (m) => m.codePointAt(0))
  }
}
