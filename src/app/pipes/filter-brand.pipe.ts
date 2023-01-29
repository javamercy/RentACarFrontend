import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'filterBrand',
})
export class FilterBrandPipe implements PipeTransform {
  transform(cars: CarDetailDto[], filterText: string): CarDetailDto[] {
    filterText ? (filterText = filterText.toLowerCase()) : (filterText = '');

    return filterText.length > 0
      ? cars.filter((c) => c.brandName.toLowerCase().indexOf(filterText) !== -1)
      : cars;
  }
}
