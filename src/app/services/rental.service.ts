import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ListResponseModel } from "../models/listResponseModel";
import { Rental } from "../models/rental";
import { RentalDetailDto } from "../models/rentalDetailDto";
import { ResponseModel } from "../models/responseModel";

@Injectable({
  providedIn: "root",
})
export class RentalService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Rental>> {
    let newUrl: string = this.apiUrl + "/rentals/getall";

    return this.httpClient.get<ListResponseModel<Rental>>(newUrl);
  }

  getAllByDetails(): Observable<ListResponseModel<RentalDetailDto>> {
    let newUrl: string = this.apiUrl + "/rentals/getallbydetails";

    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newUrl);
  }

  getAllByCarId(carId: number): Observable<ListResponseModel<Rental>> {
    let newUrl: string = this.apiUrl + "/rentals/getbycarid?carid=" + carId;

    return this.httpClient.get<ListResponseModel<Rental>>(newUrl);
  }

  add(rental: Rental): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/rentals/add";

    return this.httpClient.post<ResponseModel>(newUrl, rental);
  }
}
