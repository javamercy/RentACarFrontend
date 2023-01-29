import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Car } from "../models/car";
import { CarDetailDto } from "../models/carDetailDto";
import { ListResponseModel } from "../models/listResponseModel";
import { SingleResponseModel } from "../models/singleResponseModel";

@Injectable({
  providedIn: "root",
})
export class CarService {
  private apiUrl: string = "http://localhost:5304/api";
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Car>> {
    let newUrl: string = this.apiUrl + "/cars/getall";

    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }

  getById(carId: number): Observable<SingleResponseModel<Car>> {
    let newUrl: string = this.apiUrl + "/cars/getbyid?id=" + carId;

    return this.httpClient.get<SingleResponseModel<Car>>(newUrl);
  }

  getAllByDetails(): Observable<ListResponseModel<CarDetailDto>> {
    let newUrl: string = this.apiUrl + "/cars/getallbydetails";

    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newUrl);
  }

  getAllByDetailsByBrandId(
    brandId: number
  ): Observable<ListResponseModel<CarDetailDto>> {
    let newUrl: string =
      this.apiUrl + "/cars/getallbydetailsbybrandid?brandid=" + brandId;

    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newUrl);
  }

  getAllByDetailsByColorId(
    colorId: number
  ): Observable<ListResponseModel<CarDetailDto>> {
    let newUrl: string =
      this.apiUrl + "/cars/getallbydetailsbycolorid?colorid=" + colorId;

    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newUrl);
  }

  getAllByDetailsByBrandIdAndColorId(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<CarDetailDto>> {
    let newUrl: string =
      this.apiUrl +
      "/cars/getallbydetailsbybrandidandcolorid?brandid=" +
      brandId +
      "&colorid=" +
      colorId;

    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newUrl);
  }

  getCarDetailsByCarId(
    carId: number
  ): Observable<SingleResponseModel<CarDetailDto>> {
    let newUrl: string =
      this.apiUrl + "/cars/getcardetailsbycarid?carid=" + carId;

    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newUrl);
  }
}
