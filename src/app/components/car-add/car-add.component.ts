import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Brand } from "src/app/models/brand";
import { Car } from "src/app/models/car";
import { Color } from "src/app/models/color";
import { BrandService } from "src/app/services/brand.service";
import { CarService } from "src/app/services/car.service";
import { ColorService } from "src/app/services/color.service";

@Component({
  selector: "app-car-add",
  templateUrl: "./car-add.component.html",
  styleUrls: ["./car-add.component.css"],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  colors: Color[];
  brands: Brand[];
  years: number[];

  constructor(
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.getYears();

    this.carAddForm = new FormGroup({
      brandId: new FormControl("", Validators.required),
      colorId: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      modelYear: new FormControl("", Validators.required),
      dailyPrice: new FormControl("", Validators.required),
    });
  }

  add() {
    if (this.carAddForm.invalid) console.log(this.carAddForm.value);

    let carToAdd: Car = this.carAddForm.value as Car;

    this.carService.add(carToAdd).subscribe({
      next: (response) => console.log(response.message),

      error: (err) => console.error(err),
    });
  }

  getColors() {
    this.colorService.getAll().subscribe({
      next: (response) => {
        this.colors = response.data;
      },

      error: (err) => console.error(err),
    });
  }

  getBrands() {
    this.brandService.getAll().subscribe({
      next: (response) => {
        this.brands = response.data;
      },

      error: (err) => console.error(err),
    });
  }

  getYears() {
    const date = new Date();
    this.years = [];
    for (let i = 2000; i <= date.getFullYear(); i++) {
      this.years.push(i);
    }
  }
}
