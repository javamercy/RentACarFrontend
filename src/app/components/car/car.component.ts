import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/carImage.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  API_URL: string = 'http://localhost:5304/';
  cars: Car[];
  carsByDetails: CarDetailDto[];
  carImages: CarImage[];

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      let brandId: number = param['brandId'];
      let colorId: number = param['colorId'];
      if (brandId && colorId) {
        this.getAllByDetailsByBrandIdAndColorId(brandId, colorId);
      } else if (brandId) {
        this.getAllByDetailsByBrandId(brandId);
      } else if (colorId) {
        this.getAllByDetailsByColorId(colorId);
      } else {
        this.getAllByDetails();
      }
    });
  }

  log(any: any): void {
    console.log(any);
  }

  getAll(): void {
    this.carService.getAll().subscribe({
      next: (response) => {
        this.cars = response.data;
      },
      error: (err) => console.error(err),
    });
  }

  getAllByDetails(): void {
    this.carService.getAllByDetails().subscribe({
      next: (response) => {
        this.carsByDetails = response.data;
      },
      error: (err) => console.error(err),
    });
  }

  getAllByDetailsByBrandId(brandId: number): void {
    this.carService.getAllByDetailsByBrandId(brandId).subscribe({
      next: (response) => {
        this.carsByDetails = response.data;
      },
      error: (err) => console.error(err),
    });
  }

  getAllByDetailsByColorId(colorId: number): void {
    this.carService.getAllByDetailsByColorId(colorId).subscribe({
      next: (response) => {
        this.carsByDetails = response.data;
      },
      error: (err) => console.error(err),
    });
  }

  getAllByDetailsByBrandIdAndColorId(brandId: number, colorId: number): void {
    this.carService
      .getAllByDetailsByBrandIdAndColorId(brandId, colorId)
      .subscribe({
        next: (response) => {
          this.carsByDetails = response.data;
        },
        error: (err) => console.error(err),
      });
  }

  getCarImages() {
    this.carImageService.getAll().subscribe({
      next: (response) => (this.carImages = response.data),

      error: (err) => console.error(err),
    });
  }
}
