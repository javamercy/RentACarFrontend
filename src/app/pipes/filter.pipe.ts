import { Pipe, PipeTransform } from "@angular/core";
import { CarDetailDto } from "../models/carDetailDto";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(cars: CarDetailDto[], filterText: string): CarDetailDto[] {
    filterText ? (filterText = filterText.toLowerCase()) : (filterText = "");

    return filterText.length > 0
      ? cars.filter(
          (c) => c.carDescription.toLowerCase().indexOf(filterText) !== -1
        )
      : cars;
  }
}
