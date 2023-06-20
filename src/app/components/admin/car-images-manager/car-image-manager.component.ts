import { Component, OnInit } from "@angular/core";
import { CarImage } from "src/app/models/carImage";
import { CarImageService } from "src/app/services/carImage.service";

@Component({
  selector: "app-car-image-manager",
  templateUrl: "./car-image-manager.component.html",
  styleUrls: ["./car-image-manager.component.css"],
})
export class CarImageManagerComponent implements OnInit {
  carImages: CarImage[];

  constructor(private carImageServie: CarImageService) {}

  ngOnInit(): void {
    this.getCarImages();

  }

  getCarImages() {
    this.carImageServie.getAll().subscribe({
      next: (response) => {
        this.carImages == response.data;
      },

      error: (err) => console.error(err),
    });
  }
}
