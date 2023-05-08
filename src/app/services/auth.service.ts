import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
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
    private sessionStorageService: SessionStorageService,
    private jwtHelperService: JwtHelperService
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

  private getToken() {
    return this.localStorageService.get("token");
  }

  isTokenExpired(): boolean {
    let token = this.getToken();
    if (!token) return true;

    let expiringDate: Date = new Date(token.expiration);
    return expiringDate.getTime() < Date.now();
  }

  isAuthenticated(): boolean {
    return this.localStorageService.get("token") ? true : false;
  }

  hasRole(role: string, userId: number) {
    let token: TokenModel = this.getToken();

    if (!token) return false;

    let decodedToken = this.jwtHelperService.decodeToken(token.token);;

    let id =
      +decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];

    let roles: string[] =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];

    return roles ? roles.includes(role) && userId === id : false;
  }
}
