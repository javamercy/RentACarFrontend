import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Brand } from "src/app/models/brand";
import { Color } from "src/app/models/color";
import { BrandService } from "src/app/services/brand.service";
import { ColorService } from "src/app/services/color.service";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"],
})
export class FilterComponent implements OnInit {
  brands: Brand[];
  colors: Color[];
  filterForm: FormGroup;
  filterText: string;
  selectedBrand: Brand;
  selectedColor: Color;

  constructor(
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();

    this.filterForm = new FormGroup({
      color: new FormControl(this.selectedColor),
      brand: new FormControl(this.selectedBrand),
    });
  }

  getBrands() {
    this.brandService.getAll().subscribe({
      next: (response) => (this.brands = response.data),

      error: (err) => console.error(err),
    });
  }

  getColors() {
    this.colorService.getAll().subscribe({
      next: (response) => (this.colors = response.data),

      error: (err) => console.error(err),
    });
  }

  getRouterLink(): string {
    if (this.filterForm.invalid) return "";

    let brandRouterText: string = this.filterForm.value.brand
      ? "/brand/" + this.filterForm.value.brand.id
      : "";

    let colorRouterText: string = this.filterForm.value.color
      ? "/color/" + this.filterForm.value.color.id
      : "";

    return `/cars${brandRouterText}${colorRouterText}`;
  }

  resetForm() {
    this.filterForm.reset();
  }
}
