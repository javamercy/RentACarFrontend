import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreditCard } from "../models/creditCard";
import { Payment } from "../models/payment";
import { ResponseModel } from "../models/responseModel";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  pay(creditCard: CreditCard, amount: number): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/payments/pay?amount=" + amount;

    return this.httpClient.post<ResponseModel>(newUrl, creditCard);
  }

  add(payment: Payment): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/payments/add";

    return this.httpClient.post<ResponseModel>(newUrl, payment);
  }
}
