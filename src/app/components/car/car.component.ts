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
}
