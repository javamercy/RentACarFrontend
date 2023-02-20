import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
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
  selectedBrandName: string = "";
  selectedColorName: string = "";

  constructor(
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();

    this.filterForm = new FormGroup({
      color: new FormControl(),
      brand: new FormControl(),
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

  setSelected() {
    this.selectedBrandName = this.filterForm.value.brand?.name;
    this.selectedColorName = this.filterForm.value.color?.name;
  }

  resetForm() {
    this.filterForm.reset();
    this.selectedBrandName = "";
    this.selectedColorName = "";
  }
}
