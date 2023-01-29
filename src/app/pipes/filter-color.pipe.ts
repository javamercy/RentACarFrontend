import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'filterColor',
})
export class FilterColorPipe implements PipeTransform {
  transform(cars: CarDetailDto[], filterText: string): CarDetailDto[] {
    filterText ? (filterText = filterText.toLowerCase()) : (filterText = '');

    return filterText.length > 0
      ? cars.filter((c) => c.colorName.toLowerCase().indexOf(filterText) !== -1)
      : cars;
  }
}
