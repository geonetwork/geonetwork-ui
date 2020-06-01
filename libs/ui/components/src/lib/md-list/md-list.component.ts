import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'lib-md-list',
  template: `
    <h1>Web component</h1>
    <button class="btn btn-dark">bootstrap button</button>
    <div class="text-danger ml-5">
      Hello
      <span class="custom-class">{{ title }}</span>
    </div>
  `,
  styles: [
    `
      .custom-class {
        font-weight: bold;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MdListComponent implements OnInit {
  @Input() title: string
  constructor() {}

  ngOnInit(): void {}
}
