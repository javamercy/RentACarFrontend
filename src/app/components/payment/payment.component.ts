import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CarDetailDto } from "src/app/models/carDetailDto";
import { CreditCard } from "src/app/models/creditCard";
import { Customer } from "src/app/models/customer";
import { Payment } from "src/app/models/payment";
import { Rental } from "src/app/models/rental";
import { ResponseModel } from "src/app/models/responseModel";
import { SessionStorageRentalModel } from "src/app/models/sessionStorageRentalModel";
import { SingleResponseModel } from "src/app/models/singleResponseModel";
import { User } from "src/app/models/user";
import { CarService } from "src/app/services/car.service";
import { CustomerService } from "src/app/services/customer.service";
import { LocalStorageService } from "src/app/services/localStorage.service";
import { PaymentService } from "src/app/services/payment.service";
import { RentalService } from "src/app/services/rental.service";
import { SessionStorageService } from "src/app/services/sessionStorage.service";
import { UserService } from "src/app/services/user.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  currentUser: User;
  car: CarDetailDto;
  apiImageUrl: string = environment.apiCarImagesUrl;
  rentalDetails: SessionStorageRentalModel;
  creditCardForm: FormGroup;
  cvcPattern: string = "[0-9]{3}";
  datePattern: string = "[0-9]{2}";
  cardNumberPattern: string = "[0-9]{16}";
  onlyLettersPattern: string = "^[a-zA-Z ]*$";

  constructor(
    private paymentService: PaymentService,
    private carService: CarService,
    private userService: UserService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.getRentalDetailsFromSessionStorage();
    this.getCurrentUser().then((response) =>
      this.getCarDetailsByCarId(response.data.id)
    );

    this.createCreditCardForm();
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe({
      next: (response) => {
        this.car = response.data;
      },

      error: (err) => console.error(err),
    });
  }

  createCreditCardForm() {
    this.creditCardForm = new FormGroup({
      cardNumber: new FormControl("1234567887654321", [
        Validators.required,
        Validators.pattern(this.cardNumberPattern),
      ]),
      firstName: new FormControl("emre", [
        Validators.required,
        Validators.pattern(this.onlyLettersPattern),
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      lastName: new FormControl("kursun", [
        Validators.required,
        Validators.pattern(this.onlyLettersPattern),
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      expiringMonth: new FormControl(12, [
        Validators.required,
        Validators.pattern(this.datePattern),
      ]),
      expiringYear: new FormControl(23, [
        Validators.required,
        Validators.pattern(this.datePattern),
      ]),
      cardVerificationCode: new FormControl("123", [
        Validators.required,
        Validators.pattern(this.cvcPattern),
      ]),
    });
  }

  withdrawMoney() {
    let creditCard: CreditCard = this.creditCardForm.value as CreditCard;
    let amount: number = this.rentalDetails.totalDays * this.car.dailyPrice;

    this.paymentService.pay(creditCard, amount).subscribe({
      next: (response) => {
        this.createCustomer()
          .then((response) => {
            this.createRental();
            this.addPayment();
          })
          .catch((err) => console.log(err));
      },
      error: (err) => console.error(err),
    });
  }

  log(...any: any[]) {
    console.log(any);
  }

  addPayment() {
    let amount: number = this.rentalDetails.totalDays * this.car.dailyPrice;
    this.getByUserId(this.currentUser.id).then((customer) => {
      let payment: Payment = {
        amount: amount,
        customerId: customer.id,
        date: new Date(),
        id: 0,
      };
      this.paymentService.add(payment).subscribe({
        next: (response) => response,

        error: (err) => console.log(err),
      });
    });
  }

  createCustomer(): Promise<ResponseModel> {
    let customer: Customer = {
      id: 0,
      companyName: "Kursun Holding A.Ş",
      userId: this.currentUser.id,
    };

    return new Promise((resolve, reject) => {
      this.customerService.add(customer).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (err) => reject(err),
      });
    });
  }
  createRental() {
    this.getByUserId(this.currentUser.id)
      .then((customer) => {
        this.log(customer);
        let rental: Rental = {
          carId: this.car.carId,
          customerId: customer.id,
          id: 0,
          rentDate: new Date(),
          returnDate: this.rentalDetails.returnDate,
        };
        this.rentalService.add(rental).subscribe({
          next: (response) => console.log(response),
          error: (err) => console.error(err),
        });
      })
      .catch((err) => console.error(err));
  }

  getCurrentUser(): Promise<SingleResponseModel<User>> {
    return new Promise((resolve, reject) => {
      let email: string = this.localStorageService.get("user")["email"];
      this.userService.getByEmail(email).subscribe({
        next: (response) => {
          this.currentUser = response.data;
          resolve(response);
        },

        error: (err) => reject(err),
      });
    });
  }

  getRentalDetailsFromSessionStorage() {
    this.rentalDetails = this.sessionStorageService.get("rental");
  }

  getByUserId(userId: number): Promise<Customer> {
    return new Promise((resolve, reject) => {
      this.customerService.getByUserId(userId).subscribe({
        next: (response) => resolve(response.data),

        error: (err) => reject(err),
      });
    });
  }
}
