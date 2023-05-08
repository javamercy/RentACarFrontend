import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Color } from "../models/color";
import { ListResponseModel } from "../models/listResponseModel";
import { SingleResponseModel } from "../models/singleResponseModel";
import { ResponseModel } from "../models/responseModel";

@Injectable({
  providedIn: "root",
})
export class ColorService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Color>> {
    let newUrl: string = this.apiUrl + "/colors/getall";

    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }

  getById(id: number): Observable<SingleResponseModel<Color>> {
    let newUrl: string = this.apiUrl + "/colors/getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<Color>>(newUrl);
  }

  delete(color: Color): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/colors/delete";

    return this.httpClient.post<ResponseModel>(newUrl, color);
  }

  add(color: Color): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/colors/add";

    return this.httpClient.post<ResponseModel>(newUrl, color);
  }

  update(color: Color): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/colors/update";

    return this.httpClient.post<ResponseModel>(newUrl, color);
  }
}
