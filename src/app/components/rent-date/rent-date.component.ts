import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbCalendar, NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { CarDetailDto } from "src/app/models/carDetailDto";
import { CarService } from "src/app/services/car.service";

@Component({
  selector: "app-rent-date",
  templateUrl: "./rent-date.component.html",
  styleUrls: ["./rent-date.component.css"],
})
export class RentDateComponent implements OnInit {
  public API_URL: string = "http://localhost:5304/";
  hoveredDate: NgbDate;
  rentDate: NgbDate;
  returnDate: NgbDate;
  carToRent: CarDetailDto;

  constructor(
    private calendar: NgbCalendar,
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {
    this.rentDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let carId = +params["carId"];

      if (carId) this.getCarDetailsByCarId(carId);

      if (this.carToRent) this.log(this.carToRent);
    });
  }

  log(any: any) {
    console.log(any);
  }

  onDateSelection(date: NgbDate) {
    this.returnDate = date;
  }

  isHovered(date: NgbDate) {
    return (
      this.rentDate &&
      !this.returnDate &&
      this.hoveredDate &&
      date.after(this.rentDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return (
      this.returnDate &&
      date.after(this.rentDate) &&
      date.before(this.returnDate)
    );
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.rentDate) ||
      (this.returnDate && date.equals(this.returnDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe({
      next: (response) => {
        this.carToRent = response.data;
      },
      error: (err) => console.error(err),
    });
  }
}
