import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { Rental } from "../models/rental";
import { SessionStorageService } from "../services/sessionStorage.service";

@Injectable({
  providedIn: "root",
})
export class PaymentGuard implements CanActivate {
  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let rental: Rental = this.sessionStorageService.get("rental");

    if (rental) {
      return true;
    }
    this.router.navigate(["/home"]);
    return false;
  }
}
