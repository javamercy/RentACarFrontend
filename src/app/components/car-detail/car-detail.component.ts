import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute } from "@angular/router";
import { Car } from "src/app/models/car";
import { CarDetailDto } from "src/app/models/carDetailDto";
import { Rental } from "src/app/models/rental";
import { CarService } from "src/app/services/car.service";
import { RentalService } from "src/app/services/rental.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-car-detail",
  templateUrl: "./car-detail.component.html",
  styleUrls: ["./car-detail.component.css"],
})
export class CarDetailComponent implements OnInit {
  apiUrl: string = environment.apiUrl;
  apiCarImagesUrl: string = environment.apiCarImagesUrl;
  carByDetails: CarDetailDto;
  rentals: Rental[];
  rentForm: FormGroup;
  dateNow: Date;
  totalDays: number;

  constructor(
    private carService: CarService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dateNow = new Date();
    this.getRentals();
    this.createRentForm();
    this.activatedRoute.params.subscribe((params) => {
      let carId: number = params["carId"];
      if (carId) {
        this.getCarDetailsById(carId);
      }
    });
  }

  getCarDetailsById(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe({
      next: (response) => (this.carByDetails = response.data),

      error: (err) => console.error(err),
    });
  }

  isActiveImage(imagePath: string): boolean {
    return imagePath == this.carByDetails.imagePaths[0];
  }

  getRentals() {
    this.rentalService.getAll().subscribe({
      next: (response) => {
        this.rentals = response.data;
      },

      error: (err) => console.error(err),
    });
  }

  isAlreadyRented(carId: number): boolean {
    var result = this.rentals
      .filter((r) => r.carId === carId)
      .some((r) => {
        let dateToReturn = new Date(r.returnDate);
        return dateToReturn.getTime() > Date.now();
      });

    return result;
  }

  createRentForm() {
    this.rentForm = new FormGroup({
      returnDate: new FormControl("", Validators.required),
    });
  }

  getTotalDays() {
    let timeStart = this.dateNow.getTime();
    let timeEnd = new Date(this.rentForm.value.returnDate).getTime();

    let miliseconds = timeEnd - timeStart;
    let days = miliseconds / 1000.0 / 60 / 60 / 24;

    this.totalDays = days;
  }
}
