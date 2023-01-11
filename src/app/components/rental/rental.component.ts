import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  rentalsByDetails: RentalDetailDto[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getAll();
    this.getAllByDetails();
  }

  getAll(): void {
    this.rentalService.getAll().subscribe({
      next: (response) => (this.rentals = response.data),

      error: (err) => console.error(err),
    });
  }

  getAllByDetails(): void {
    this.rentalService.getAllByDetails().subscribe({
      next: (response) => (this.rentalsByDetails = response.data),

      error: (err) => console.error(err),
    });
  }
}
