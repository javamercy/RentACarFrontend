import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Car } from "src/app/models/car";
import { Payment } from "src/app/models/payment";
import { Rental } from "src/app/models/rental";
import { CarService } from "src/app/services/car.service";
import { PaymentService } from "src/app/services/payment.service";
import { RentalService } from "src/app/services/rental.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  carToPay: Car;
  payment: Payment = {
    id: 1,
    cardNumber: "2123",
    firstName: "Emre",
    lastName: "Kurşun",
    cardVerificationCode: 462,
    expiringMonth: 12,
    expiringYear: 2,
  };

  constructor(
    private carService: CarService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let carId: number = +params["carId"];

      if (carId) {
        this.getCarToPay(carId);
      }
    });
  }

  getCarToPay(carId: number): void {
    this.carService.getById(carId).subscribe({
      next: (response) => (this.carToPay = response.data),

      error: (err) => console.error(err),
    });
  }

  addPayment(payment: Payment) {
    this.paymentService.add(payment).subscribe({
      next: (response) => {
        this.addRental();
        this.router.navigate(["/"]);
      },

      error: (err) => console.error(err),
    });
  }

  addRental(): void {
    let dateTomorrow = new Date(2023, 2, 23);

    let rental: Rental = {
      carId: this.carToPay.id,
      customerId: 2,
      returnDate: dateTomorrow,
    } as Rental;

    this.rentalService.add(rental).subscribe({
      next: (response) => {},
      error: (err) => console.error(err),
    });
  }
}
