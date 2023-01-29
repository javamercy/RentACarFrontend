import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CarComponent } from "./components/car/car.component";
import { ColorComponent } from "./components/color/color.component";
import { BrandComponent } from "./components/brand/brand.component";

import { HttpClientModule } from "@angular/common/http";
import { CustomerComponent } from "./components/customer/customer.component";
import { CarDetailComponent } from "./components/car-detail/car-detail.component";
import { FormsModule } from "@angular/forms";
import { FilterComponent } from "./components/filter/filter.component";
import { FilterBrandColorComponent } from "./components/filter-brand-color/filter-brand-color.component";
import { FilterColorPipe } from "./pipes/filter-color.pipe";
import { FilterBrandPipe } from "./pipes/filter-brand.pipe";
import { RentDateComponent } from "./components/rent-date/rent-date.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PaymentComponent } from "./components/payment/payment.component";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarComponent,
    ColorComponent,
    BrandComponent,
    CustomerComponent,
    CarDetailComponent,
    FilterComponent,
    FilterBrandColorComponent,
    FilterColorPipe,
    FilterBrandPipe,
    RentDateComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ToastrModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
