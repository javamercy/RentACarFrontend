import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Brand } from "../models/brand";
import { ListResponseModel } from "../models/listResponseModel";
import { SingleResponseModel } from "../models/singleResponseModel";
import { ResponseModel } from "../models/responseModel";

@Injectable({
  providedIn: "root",
})
export class BrandService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Brand>> {
    let newUrl: string = this.apiUrl + "/brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
  }

  getById(id: number): Observable<SingleResponseModel<Brand>> {
    let newUrl: string = this.apiUrl + "/brands/getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<Brand>>(newUrl);
  }

  delete(brand: Brand): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/brands/delete";
    return this.httpClient.post<ResponseModel>(newUrl, brand);
  }
}
