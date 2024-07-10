import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], index: number): any {
    return array.find((item) => item.index === index)
  }
}
