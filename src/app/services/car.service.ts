import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Car } from "../models/car";
import { CarDetailDto } from "../models/carDetailDto";
import { ListResponseModel } from "../models/listResponseModel";
import { ResponseModel } from "../models/responseModel";
import { SingleResponseModel } from "../models/singleResponseModel";

@Injectable({
  providedIn: "root",
})
export class CarService {
  private apiUrl: string = environment.apiUrl;

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

  add(car: Car): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/cars/add";

    return this.httpClient.post<ResponseModel>(newUrl, car);
  }
}
