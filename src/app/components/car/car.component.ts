import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carsByDetails: CarDetailDto[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getAll();
    this.getAllByDetails();
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
        this.log(this.carsByDetails);
      },
      error: (err) => console.error(err),
    });
  }
}
