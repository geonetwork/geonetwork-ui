import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'lib-components',
  template: `
    <button class="btn btn-danger ml-2">Hello button geonetwork</button>
  `,
  styles: [],
})
export class ComponentsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
