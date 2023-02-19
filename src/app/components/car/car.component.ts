import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Car } from "src/app/models/car";
import { CarDetailDto } from "src/app/models/carDetailDto";
import { CarImage } from "src/app/models/carImage";
import { CarImageService } from "src/app/services/carImage.service";
import { CarService } from "src/app/services/car.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-car",
  templateUrl: "./car.component.html",
  styleUrls: ["./car.component.css"],
})
export class CarComponent implements OnInit {
  cars: CarDetailDto[];
  apiCarImagesUrl: string = environment.apiCarImagesUrl;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCarsByDetails();
  }

  getCarsByDetails() {
    this.carService.getAllByDetails().subscribe({
      next: (response) => {
        this.cars = this.getCarsByActivatedRoute(response.data);
      },

      error: (err) => console.error(err),
    });
  }

  getCarsByActivatedRoute(cars: CarDetailDto[]) {
    let filteredCars: CarDetailDto[];

    this.activatedRoute.params.subscribe((params) => {
      let colorId: number = params["colorId"];
      let brandId: number = params["brandId"];
      console.log(params);

      if (colorId && brandId) {
        filteredCars = cars.filter(
          (c) => c.colorId == colorId && c.brandId == brandId
        );
      } else if (colorId) {
        filteredCars = cars.filter((c) => c.colorId == colorId);
      } else if (brandId) {
        filteredCars = cars.filter((c) => c.brandId == brandId);
      } else filteredCars = cars;
    });

    return filteredCars;
  }
}
