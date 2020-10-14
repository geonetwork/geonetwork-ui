import { Input, OnInit } from '@angular/core'
import { ColorService } from '@lib/common'
import { Configuration } from '@lib/gn-api'

export const apiConfiguration = new Configuration()

export class BaseComponent implements OnInit {
  @Input() apiUrl = '/'
  @Input() primaryColor = '#9a9a9a'
  @Input() secondaryColor = '#767676'
  @Input() mainColor = '#1a1a1a'
  @Input() backgroundColor = '#cecece'

  constructor() {}

  ngOnInit(): void {
    apiConfiguration.basePath = this.apiUrl
    ColorService.applyCssVariables(
      this.primaryColor,
      this.secondaryColor,
      this.mainColor,
      this.backgroundColor
    )
  }
}
