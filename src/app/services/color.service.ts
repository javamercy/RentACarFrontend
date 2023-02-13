import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Color>> {
    let newUrl: string = this.apiUrl + '/colors/getall';

    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }

  getById(id: number): Observable<SingleResponseModel<Color>> {
    let newUrl: string = this.apiUrl + '/colors/getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Color>>(newUrl);
  }
}
