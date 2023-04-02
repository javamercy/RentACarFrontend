import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Brand } from "src/app/models/brand";
import { Car } from "src/app/models/car";
import { Color } from "src/app/models/color";
import { BrandService } from "src/app/services/brand.service";
import { CarService } from "src/app/services/car.service";
import { ColorService } from "src/app/services/color.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  cars: Car[];
  brands: Brand[];
  colors: Color[];

  constructor(
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getCars();
    this.getColors();

    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
    });
  }

  getCars() {
    this.carService.getAll().subscribe({
      next: (response) => {
        this.cars = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getColors() {
    this.colorService.getAll().subscribe({
      next: (response) => {
        this.colors = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
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
}
