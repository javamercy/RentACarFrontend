import { Component, OnInit } from "@angular/core";
import { CarDetailDto } from "src/app/models/carDetailDto";
import { CarService } from "src/app/services/car.service";
import { environment } from "src/environments/environment";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  cars: CarDetailDto[];
  apiCarImagesUrl: string = environment.apiCarImagesUrl;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCarsByDetails();
  }

  getCarsByDetails() {
    this.carService.getAllByDetails().subscribe({
      next: (response) => (this.cars = response.data),

      error: (err) => console.error(err),
    });
  }
}
