import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Customer } from "../models/customer";
import { ListResponseModel } from "../models/listResponseModel";
import { ResponseModel } from "../models/responseModel";
import { SingleResponseModel } from "../models/singleResponseModel";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Customer>> {
    let newUrl: string = this.apiUrl + "/customers/getall";

    return this.httpClient.get<ListResponseModel<Customer>>(newUrl);
  }

  getByUserId(userId: number): Observable<SingleResponseModel<Customer>> {
    let newUrl: string =
      this.apiUrl + "/customers/getbyuserid?userid=" + userId;

    return this.httpClient.get<SingleResponseModel<Customer>>(newUrl);
  }

  add(customer: Customer): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/customers/add";

    return this.httpClient.post<ResponseModel>(newUrl, customer);
  }
}
