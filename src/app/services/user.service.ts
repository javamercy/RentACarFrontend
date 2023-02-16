import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SingleResponseModel } from "../models/singleResponseModel";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getByEmail(email: string): Observable<SingleResponseModel<User>> {
    let newUrl: string = this.apiUrl + "/users/getbyemail?email=" + email;

    return this.httpClient.get<SingleResponseModel<User>>(newUrl);
  }
}
