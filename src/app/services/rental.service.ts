import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailDto } from '../models/rentalDetailDto';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiUrl: string = 'http://localhost:5304/api';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Rental>> {
    let newUrl: string = this.apiUrl + '/rentals/getall';

    return this.httpClient.get<ListResponseModel<Rental>>(newUrl);
  }

  getAllByDetails(): Observable<ListResponseModel<RentalDetailDto>> {
    let newUrl: string = this.apiUrl + '/rentals/getallbydetails';

    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newUrl);
  }
}
