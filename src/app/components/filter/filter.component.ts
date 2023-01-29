import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  getRouterLink(selectedBrandId: number, selectedColorId: number): string {
    if (selectedBrandId && selectedColorId) {
      return `cars/brand/${selectedBrandId}/color/${selectedColorId}`;
    } else if (selectedColorId && !selectedBrandId) {
      return `cars/color/${selectedColorId}`;
    } else if (selectedBrandId && !selectedColorId) {
      return `cars/brand/${selectedBrandId}`;
    } else {
      return 'cars';
    }
  }
}
