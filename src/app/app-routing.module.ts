import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { SingupComponent } from "./components/auth/singup/singup.component";
import { CarAddComponent } from "./components/car-add/car-add.component";
import { CarDetailComponent } from "./components/car-detail/car-detail.component";
import { CarComponent } from "./components/car/car.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/profile/profile.component";

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
  { path: "cars", component: CarComponent },
  { path: "cars/car-detail/:carId", component: CarDetailComponent },
  { path: "cars/add", component: CarAddComponent },
  { path: "profile", component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
