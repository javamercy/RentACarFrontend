import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ListResponseModel } from "../models/listResponseModel";
import { Model } from "../models/model";
import { SingleResponseModel } from "../models/singleResponseModel";
import { ResponseModel } from "../models/responseModel";

@Injectable({
  providedIn: "root",
})
export class ModelService {
  private apiUrl: string = environment.apiUrl + "/models";
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Model>> {
    let newUrl: string = this.apiUrl + "/getall";

    return this.httpClient.get<ListResponseModel<Model>>(newUrl);
  }

  getById(id: number): Observable<SingleResponseModel<Model>> {
    let newUrl: string = this.apiUrl + "/getbyid?id=" + id;

    return this.httpClient.get<SingleResponseModel<Model>>(newUrl);
  }

  getAllByBrandId(brandId: number): Observable<ListResponseModel<Model>> {
    let newUrl: string = this.apiUrl + "/getallbybrandid?brandid=" + brandId;

    return this.httpClient.get<ListResponseModel<Model>>(newUrl);
  }

  add(model: Model): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/add";

    return this.httpClient.post<ResponseModel>(newUrl, model);
  }

  update(model: Model): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/update";

    return this.httpClient.post<ResponseModel>(newUrl, model);
  }

  delete(model: Model): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/delete";

    return this.httpClient.post<ResponseModel>(newUrl, model);
  }
}
