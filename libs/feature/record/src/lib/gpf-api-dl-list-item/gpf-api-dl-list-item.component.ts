import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { NgIconsModule } from '@ng-icons/core'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { map, mergeMap, Observable } from 'rxjs'

@Component({
  selector: 'gn-ui-gpf-api-dl-list-item',
  templateUrl: './gpf-api-dl-list-item.component.html',
  styleUrls: ['./gpf-api-dl-list-item.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateDirective, TranslatePipe, NgIconsModule],
})
export class GpfApiDlListItemComponent implements OnInit {
  @Input() link
  @Input() color: string
  @Input() format: string
  @Input() isFromWfs: boolean

  constructor(protected http: HttpClient) {}
  liste$: Observable<any>

  ngOnInit(): void {
    this.liste$ = this.http
      .get(this.link['id'])
      .pipe(map((response) => response['entry']))
  }

  downloadListe(): void {
    this.http
      .get(this.link['id'])
      .pipe(
        map((response) => response['entry']),
        mergeMap((response) => response)
      )
      .subscribe((reponse) => this.download(reponse['id']))
  }

  download(url): void {
    this.http.get(url).subscribe()
  }
}
