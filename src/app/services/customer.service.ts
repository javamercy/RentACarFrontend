import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl: string = 'http://localhost:5304/api';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Customer>> {
    let newUrl: string = this.apiUrl + '/customers/getall';

   return this.httpClient.get<ListResponseModel<Customer>>(newUrl);
  }
}
