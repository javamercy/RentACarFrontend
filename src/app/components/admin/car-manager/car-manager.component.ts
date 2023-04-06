import { Component, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { Car } from "src/app/models/car";
import { CarDetailDto } from "src/app/models/carDetailDto";
import { CarService } from "src/app/services/car.service";

@Component({
  selector: "app-car-manager",
  templateUrl: "./car-manager.component.html",
  styleUrls: ["./car-manager.component.css"],
})
export class CarManagerComponent implements OnInit {
  cars: Car[];
  carToDelete: Car;
  warningIcon: IconDefinition = faExclamationTriangle;

  constructor(
    private carService: CarService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carService.getAll().subscribe({
      next: (response) => {
        this.cars = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  delete(car: Car) {
    this.carService.delete(car).subscribe({
      next: (response) => {
        this.toastrService.info(
          `Car was deleted: ${car.description}`,
          "DELETED"
        );
        this.getCars();
      },
    });
  }
}
