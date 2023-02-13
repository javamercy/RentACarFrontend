import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<CarImage>> {
    let newUrl: string = this.apiUrl + '/carimages/getall';

    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl);
  }

  getAllByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newUrl: string = this.apiUrl + '/carimages/getbycarid?carid=' + carId;

    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl);
  }
}
