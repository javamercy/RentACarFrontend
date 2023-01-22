import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  private API_URL: string = 'http://localhost:5304/api';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<CarImage>> {
    let newUrl: string = this.API_URL + '/carimages/getall';

    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl);
  }

  getAllByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newUrl: string = this.API_URL + '/carimages/getbycarid?carid=' + carId;

    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl);
  }
}
