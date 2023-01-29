import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Payment } from "../models/payment";
import { ResponseModel } from "../models/responseModel";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  private API_URL: string = "http://localhost:5304/api";

  constructor(private httpClient: HttpClient) {}

  add(payment: Payment): Observable<ResponseModel> {
    let newUrl: string = this.API_URL + "/payments/add";

    return this.httpClient.post<ResponseModel>(newUrl, payment);
  }
}
