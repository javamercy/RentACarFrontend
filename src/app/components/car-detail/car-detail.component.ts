import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  public API_URL: string = 'http://localhost:5304/';
  public carByDetails: CarDetailDto;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let carId: number = params['carId'];

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
}
