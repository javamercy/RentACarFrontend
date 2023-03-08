import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ChangePasswordModel } from "../models/changePasswordModel";
import { LoginModel } from "../models/loginModel";
import { ResponseModel } from "../models/responseModel";
import { SignupModel } from "../models/signupModel";
import { SingleResponseModel } from "../models/singleResponseModel";
import { TokenModel } from "../models/tokenModel";
import { LocalStorageService } from "./localStorage.service";
import { SessionStorageService } from "./sessionStorage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {}

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

  signout(): void {
    this.localStorageService.remove("token");
    this.localStorageService.remove("user");
    this.sessionStorageService.remove("rental");
  }

  changePassword(
    changePasswordModel: ChangePasswordModel
  ): Observable<ResponseModel> {
    let newUrl: string = this.apiUrl + "/auth/changepassword";

    return this.httpClient.post<ResponseModel>(newUrl, changePasswordModel);
  }

  isTokenExpired(): boolean {
    let token: TokenModel = this.localStorageService.get("token");

    if (!token) return true;

    let expiringDate: Date = new Date(token.expiration);
    return expiringDate.getTime() < Date.now();
  }

  isAuthenticated(): boolean {
    return this.localStorageService.get("token") ? true : false;
  }
}
