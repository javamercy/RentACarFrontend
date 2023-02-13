import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Customer } from "../models/customer";
import { ListResponseModel } from "../models/listResponseModel";

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
}
