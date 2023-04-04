import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./components/admin/admin.component";
import { BrandAddComponent } from "./components/admin/brand-add/brand-add.component";
import { BrandManagerComponent } from "./components/admin/brand-manager/brand-manager.component";
import { AuthComponent } from "./components/auth/auth.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { SingupComponent } from "./components/auth/singup/singup.component";
import { CarAddComponent } from "./components/car-add/car-add.component";
import { CarDetailComponent } from "./components/car-detail/car-detail.component";
import { CarComponent } from "./components/car/car.component";
import { HomeComponent } from "./components/home/home.component";
import { PaymentSuccessComponent } from "./components/payment-success/payment-success.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { LoginGuard } from "./guards/login.guard";
import { PaymentGuard } from "./guards/payment.guard";
import { BrandUpdateComponent } from "./components/admin/brand-update/brand-update.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "home", pathMatch: "full", component: HomeComponent },
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "signup", component: SingupComponent },
    ],
  },
  { path: "cars", component: HomeComponent },
  {
    path: "cars/car-detail/:carId",
    component: CarDetailComponent,
    canActivate: [LoginGuard],
  },
  { path: "cars/add", component: CarAddComponent, canActivate: [LoginGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [LoginGuard] },
  {
    path: "payment",
    component: PaymentComponent,
    canActivate: [PaymentGuard, LoginGuard],
  },
  {
    path: "payment-success",
    component: PaymentSuccessComponent,
    canActivate: [PaymentGuard, LoginGuard],
  },

  {
    path: "admin/management",
    component: AdminComponent,
    children: [
      {
        path: "brands",
        component: BrandManagerComponent,
      },
      {
        path: "brands/add",
        component: BrandAddComponent,
      },

      {
        path: "brands/update/:brandId",
        component: BrandUpdateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
