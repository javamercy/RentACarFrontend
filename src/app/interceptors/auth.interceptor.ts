import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenModel } from "../models/tokenModel";
import { LocalStorageService } from "../services/localStorage.service";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: TokenModel = this.localStorageService.get("token");

    if (this.authService.isTokenExpired()) {
      this.authService.signout();
      return next.handle(request);
    }

    if (token) {
      let newRequest: HttpRequest<any> = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${token.token}`),
      });

      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
