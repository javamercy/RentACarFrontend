import { Component, OnInit } from "@angular/core";
import { Brand } from "src/app/models/brand";
import { BrandService } from "src/app/services/brand.service";

@Component({
  selector: "app-brand-manager",
  templateUrl: "./brand-manager.component.html",
  styleUrls: ["./brand-manager.component.css"],
})
export class BrandManagerComponent implements OnInit {
  brands: Brand[];
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getAll().subscribe({
      next: (response) => {
        this.brands = response.data;

      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  delete(brand: Brand) {
    this.brandService.delete(brand).subscribe({
      next: (response) => {},
      error: (error) => console.log(error),
    });
  }
}
