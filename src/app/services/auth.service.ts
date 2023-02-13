import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginModel } from "../models/loginModel";
import { ResponseModel } from "../models/responseModel";
import { SignupModel } from "../models/signupModel";
import { SingleResponseModel } from "../models/singleResponseModel";
import { TokenModel } from "../models/tokenModel";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newUrl: string = this.apiUrl + "/auth/login";

    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newUrl,
      loginModel
    );
  }

  signup(
    signupModel: SignupModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let newUrl: string = this.apiUrl + "/auth/register";

    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newUrl,
      signupModel
    );
  }
}
