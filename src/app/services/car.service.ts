import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl: string = 'http://localhost:5304/api';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Car>> {
    let newUrl: string = this.apiUrl + '/cars/getall';

    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }

  getAllByDetails(): Observable<ListResponseModel<CarDetailDto>> {
    let newUrl: string = this.apiUrl + '/cars/getallbydetails';

    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newUrl);
  }
}
