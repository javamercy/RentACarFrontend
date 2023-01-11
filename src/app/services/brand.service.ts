import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl: string = 'http://localhost:5304/api';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Brand>> {
    let newUrl: string = this.apiUrl + '/brands/getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
  }
}
