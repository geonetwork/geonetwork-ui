import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'datahub-organization-preview-datahub',
  templateUrl: './organization-preview-datahub.component.html',
  styleUrls: ['./organization-preview-datahub.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationPreviewDatahubComponent {
  @Input() title: string
  @Input() description: string
  @Input() logo: string
  @Input() nRecords: number

  constructor() {}
}
