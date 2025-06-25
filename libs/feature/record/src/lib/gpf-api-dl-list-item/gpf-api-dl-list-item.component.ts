import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { NgIconsModule } from '@ng-icons/core'
import { TranslateModule } from '@ngx-translate/core'
import { Observable, map, take } from 'rxjs'
import { CdkAccordionModule } from '@angular/cdk/accordion'


@Component({
  selector: 'gn-ui-gpf-api-dl-list-item',
  templateUrl: './gpf-api-dl-list-item.component.html',
  styleUrls: ['./gpf-api-dl-list-item.component.css'],
  standalone: true,

  imports: [CommonModule, TranslateModule, NgIconsModule, CdkAccordionModule],

})
export class GpfApiDlListItemComponent implements OnInit {
  @Input() link
  @Input() color: string
  @Input() format: string
  @Input() isFromWfs: boolean

  constructor(protected http: HttpClient) {}

  liste$: Observable<any>
  isOpen = false

  ngOnInit(): void {
    this.liste$ = this.http
      .get(this.link['id'])
      .pipe(map((response) => response['entry']))
  }

  async downloadMultipleFiles() {
    this.liste$.pipe(take(1)).subscribe(async (fileUrls: { id: string }[]) => {
      if (!fileUrls || fileUrls.length === 0) {
        console.warn('Aucun fichier à télécharger.')
        return
      }

      console.log('fileUrls:', fileUrls)

      for (const fileUrl of fileUrls) {
        if (fileUrl?.id) {
          await this.downloadFile(fileUrl.id)
        } else {
          console.warn('Fichier invalide :', fileUrl)
        }
      }
    })
  }

  private downloadFile(url: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', '')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        resolve()
      }, 1000) // Attendre 1s entre chaque téléchargement
    })
  }
}
