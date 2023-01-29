import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-brand-color',
  templateUrl: './filter-brand-color.component.html',
  styleUrls: ['./filter-brand-color.component.css'],
})
export class FilterBrandColorComponent implements OnInit {
  colorFilterText: string;
  brandFilterText: string;

  constructor() {}
  ngOnInit(): void {}
}
