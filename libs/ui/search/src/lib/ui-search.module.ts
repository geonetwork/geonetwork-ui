import { NgModule } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { TagInputModule } from 'ngx-chips'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import {
  RESULTS_LAYOUT_CONFIG,
  DEFAULT_RESULTS_LAYOUT_CONFIG,
} from './results-list/results-layout.config'

@NgModule({
  imports: [
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    MatCheckboxModule,
    RouterLink,
  ],
  providers: [
    { provide: RESULTS_LAYOUT_CONFIG, useValue: DEFAULT_RESULTS_LAYOUT_CONFIG },
  ],
})
export class UiSearchModule {}
