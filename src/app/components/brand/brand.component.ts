import { Component, OnInit } from "@angular/core";
import { Brand } from "src/app/models/brand";
import { BrandService } from "src/app/services/brand.service";

@Component({
  selector: "app-brand",
  templateUrl: "./brand.component.html",
  styleUrls: ["./brand.component.css"],
})
export class BrandComponent implements OnInit {
  brands: Brand[];
  selectedBrandId: number;
  isAllBrands: boolean = false;
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getAll();
  }

  log(any: any): void {
    console.log(any);
  }

  getAll(): void {
    this.brandService.getAll().subscribe({
      next: (response) => (this.brands = response.data),

      error: (err) => console.error(err),
    });
  }

  setSelectedBrandId(brandId: number): void {
    this.selectedBrandId = brandId;
  }

  isSelectedBrand(brand: Brand): boolean {
    return this.selectedBrandId == brand.id;
  }
}
