import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Brand } from "src/app/models/brand";
import { Car } from "src/app/models/car";
import { Color } from "src/app/models/color";
import { BrandService } from "src/app/services/brand.service";
import { CarService } from "src/app/services/car.service";
import { CarImageService } from "src/app/services/carImage.service";
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

  constructor(
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm = new FormGroup({
      colorId: new FormControl("", Validators.required),
      brandId: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      dailyPrice: new FormControl("", Validators.required),
      modelYear: new FormControl("", Validators.required),
    });
  }

  getColors() {
    this.colorService.getAll().subscribe({
      next: (response) => {
        this.colors = response.data;
      },
      error: (error) => console.error(error),
    });
  }

  getBrands() {
    this.brandService.getAll().subscribe({
      next: (response) => {
        this.brands = response.data;
      },
      error: (error) => console.error(error),
    });
  }

  add() {
    if (this.carAddForm.invalid) return;

    let car: Car = Object.assign({}, this.carAddForm.value);

    this.carService.add(car).subscribe({
      next: (response) => {
        this.toastrService.success("New Car was added.", "SUCCESS");
      },
      error: (error) => console.error(error),
    });
  }

  log(any: any) {
    console.log(any);
  }
}
