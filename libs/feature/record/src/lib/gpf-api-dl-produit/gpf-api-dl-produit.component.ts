import { HttpClient } from '@angular/common/http'
import { Component, Input, OnInit } from '@angular/core'
import { Observable, map, mergeMap } from 'rxjs'

@Component({
  selector: 'gn-ui-gpf-api-dl-produit',
  templateUrl: './gpf-api-dl-produit.component.html',
  styleUrls: ['./gpf-api-dl-produit.component.css'],
})
export class GpfApiDlProduitComponent implements OnInit {
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
