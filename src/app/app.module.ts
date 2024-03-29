import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { JwtModule, JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
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
import { PaymentSuccessComponent } from "./components/payment-success/payment-success.component";
import { AdminComponent } from "./components/admin/admin.component";
import { BrandManagerComponent } from "./components/admin/brand-manager/brand-manager.component";
import { BrandAddComponent } from "./components/admin/brand-add/brand-add.component";
import { BrandUpdateComponent } from "./components/admin/brand-update/brand-update.component";
import { CarManagerComponent } from "./components/admin/car-manager/car-manager.component";
import { CarUpdateComponent } from "./components/admin/car-update/car-update.component";
import { CarAddComponent } from "./components/admin/car-add/car-add.component";
import { ColorManagerComponent } from './components/admin/color-manager/color-manager.component';
import { ColorAddComponent } from './components/admin/color-add/color-add.component';
import { ColorUpdateComponent } from './components/admin/color-update/color-update.component';
import { CarImageManagerComponent } from './components/admin/car-images-manager/car-image-manager.component';
import { CarImageAddComponent } from './components/admin/car-images-add/car-image-add.component';
import { ModelManagerComponent } from './components/admin/model-manager/model-manager.component';
import { ModelAddComponent } from './components/admin/model-add/model-add.component';
import { ModelUpdateComponent } from './components/admin/model-update/model-update.component';

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
    AdminComponent,
    BrandManagerComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    CarManagerComponent,
    CarUpdateComponent,
    CarAddComponent,
    ColorManagerComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    CarImageManagerComponent,
    CarImageAddComponent,
    ModelManagerComponent,
    ModelAddComponent,
    ModelUpdateComponent,
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
    JwtModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
