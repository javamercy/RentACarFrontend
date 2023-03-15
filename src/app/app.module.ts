import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CarComponent } from "./components/car/car.component";
import { ColorComponent } from "./components/color/color.component";
import { BrandComponent } from "./components/brand/brand.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CustomerComponent } from "./components/customer/customer.component";
import { CarDetailComponent } from "./components/car-detail/car-detail.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FilterColorPipe } from "./pipes/filter-color.pipe";
import { FilterBrandPipe } from "./pipes/filter-brand.pipe";

import { CarAddComponent } from "./components/car-add/car-add.component";
import { AuthComponent } from "./components/auth/auth.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { SingupComponent } from "./components/auth/singup/singup.component";
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FilterComponent } from "./components/filter/filter.component";
import { FilterPipe } from "./pipes/filter.pipe";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { PaymentComponent } from "./components/payment/payment.component";
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarComponent,
    ColorComponent,
    BrandComponent,
    CustomerComponent,
    CarDetailComponent,
    FilterColorPipe,
    FilterBrandPipe,
    CarAddComponent,
    AuthComponent,
    LoginComponent,
    SingupComponent,
    HomeComponent,
    FooterComponent,
    FilterComponent,
    FilterPipe,
    ProfileComponent,
    PaymentComponent,
    PaymentSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,

    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
