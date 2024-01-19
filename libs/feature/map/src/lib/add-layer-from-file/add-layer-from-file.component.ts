import { ChangeDetectorRef, Component } from '@angular/core'
import { MapContextLayerModel } from '../map-context/map-context.model'
import { MapFacade } from '../+state/map.facade'

@Component({
  selector: 'gn-ui-add-layer-from-file',
  templateUrl: './add-layer-from-file.component.html',
  styleUrls: ['./add-layer-from-file.component.css'],
})
export class AddLayerFromFileComponent {
  errorMessage: string | null = null
  successMessage: string | null = null
  loading = false
  readonly acceptedMimeType = ['.geojson']
  readonly maxFileSize = 5000000

  constructor(
    private mapFacade: MapFacade,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  async handleFileChange(file: File) {
    if (!file) {
      this.errorMessage = 'File is invalid'
      this.displayError()
      return
    }
    if (file.size > this.maxFileSize) {
      this.errorMessage = 'File size exceeds the limit of 5MB'
      this.displayError()
      return
    }
    await this.addLayer(file)
  }

  private async addLayer(file: File) {
    this.errorMessage = null
    this.loading = true
    try {
      if (!this.isFileFormatValid(file)) {
        this.errorMessage = 'Invalid file format'
        this.displayError()
        return
      }

      const fileExtension = file.name.split('.').pop()
      switch (fileExtension) {
        case 'geojson':
          await this.addGeoJsonLayer(file)
          break
        default:
          this.errorMessage = 'Invalid file format'
          this.displayError()
          break
      }
    } catch (error) {
      const err = error as Error
      this.errorMessage = 'Error loading file: ' + err.message
      this.displayError()
    } finally {
      this.loading = false
    }
  }

  private addGeoJsonLayer(file: File) {
    return new Promise<void>((resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          const title = file.name.split('.').slice(0, -1).join('.')
          const layerToAdd: MapContextLayerModel = {
            type: 'geojson',
            data: result,
          }
          this.mapFacade.addLayer({ ...layerToAdd, title: title })
          this.successMessage = 'File successfully added to map'
          setTimeout(() => {
            this.successMessage = null
            this.changeDetectorRef.detectChanges()
          }, 5000)
          resolve()
        }
        reader.onerror = reject
        reader.readAsText(file)
      } catch (error) {
        reject(error)
      }
    })
  }

  private isFileFormatValid(file: File): boolean {
    const fileExtension = file.name.split('.').pop()
    return this.acceptedMimeType.includes(`.${fileExtension}`)
  }

  private displayError() {
    setTimeout(() => {
      this.errorMessage = null
      this.changeDetectorRef.detectChanges()
    }, 5000)
  }
}
