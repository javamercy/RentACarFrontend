import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Payment } from "../models/payment";
import { ResponseModel } from "../models/responseModel";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  add(payment: Payment): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/payments/add";

    return this.httpClient.post<ResponseModel>(newUrl, payment);
  }
}
