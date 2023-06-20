import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Brand } from "src/app/models/brand";
import { Car } from "src/app/models/car";
import { Color } from "src/app/models/color";
import { Model } from "src/app/models/model";
import { BrandService } from "src/app/services/brand.service";
import { CarService } from "src/app/services/car.service";
import { ColorService } from "src/app/services/color.service";
import { ModelService } from "src/app/services/model.service";

@Component({
  selector: "app-car-update",
  templateUrl: "./car-update.component.html",
  styleUrls: ["./car-update.component.css"],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  colors: Color[];
  brands: Brand[];
  models: Model[];
  carToUpdate: Car;

  constructor(
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private modelService: ModelService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.getBrands();

    this.activatedRoute.params.subscribe((params) => {
      let carId: number = params["carId"];

      if (carId) {
        this.getCarById(carId);
      }
    });
  }

  createCarAddForm() {
    this.carUpdateForm = new FormGroup({
      id: new FormControl(
        { disabled: true, value: this.carToUpdate.id },
        Validators.required
      ),
      colorId: new FormControl(this.carToUpdate.colorId, Validators.required),
      brandId: new FormControl(this.carToUpdate.brandId, Validators.required),
      modelId: new FormControl(this.carToUpdate.modelId, Validators.required),
      description: new FormControl(
        this.carToUpdate.description,
        Validators.required
      ),
      dailyPrice: new FormControl(
        this.carToUpdate.dailyPrice,
        Validators.required
      ),
      modelYear: new FormControl(
        this.carToUpdate.modelYear,
        Validators.required
      ),
    });
  }

  getCarById(id: number) {
    this.carService.getById(id).subscribe({
      next: (response) => {
        this.carToUpdate = response.data;
        this.getModels();
        this.createCarAddForm();
      },

      error: (error) => console.error(error),
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

  getModels() {
    this.modelService.getAllByBrandId(this.carToUpdate.brandId).subscribe({
      next: (response) => {
        this.models = response.data;
      },
      error: (error) => console.error(error),
    });
  }

  update() {
    if (this.carUpdateForm.invalid) return;

    let carToUpdate: Car = Object.assign({}, this.carUpdateForm.value);
    carToUpdate.id = this.carToUpdate.id;
    this.carService.update(carToUpdate).subscribe({
      next: (response) => {
        this.toastrService.success("Car was updated!", "SUCCESS");
        this.router.navigate(["/admin/management/cars"]);
      },
      error: (error) => console.error(error),
    });
  }
}
