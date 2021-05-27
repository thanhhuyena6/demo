import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BreadcrumbModule} from "angular-crumbs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { SlickCarouselModule } from 'ngx-slick-carousel';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CartComponent} from './components/cart/cart.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './components/home/home.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {OrdersComponent} from './components/orders/orders.component';
import {ProfileComponent} from './components/profile/profile.component';
import {BreadcrumbComponent} from "./components/breadcrumb/breadcrumb.component";
import {MenuService} from './services/menu.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {CategoryListComponent} from './components/category-list/category-list.component';
import {CategoryDetailsComponent} from './components/category-details/category-details.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductFilterPipe} from './pipes/product-filter.pipe';
import {AlertComponent} from './shared/alert/alert.component';
import {ApplicationErrorComponent} from './shared/application-error/application-error.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {ResourceNotFoundComponent} from './shared/resource-not-found/resource-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./shared/material/material.module";
import {AdminModule} from "./admin/admin.module";
import {NgxModule} from "./shared/ngx/ngx.module";
import {FileModule} from "./shared/file/file.module";
// import {TokenInterceptorService} from "./services/auth/token-interceptor.service";
// import {ErrorInterceptorService} from "./services/auth/error-interceptor.service";
import { ProductDetailsComponent } from './components/product-details/product-details.component';


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CheckoutComponent,
    OrdersComponent,
    ProfileComponent,
    BreadcrumbComponent,
    CategoryListComponent,
    CategoryDetailsComponent,
    ProductListComponent,
    ProductFilterPipe,
    AlertComponent,
    ApplicationErrorComponent,
    PageNotFoundComponent,
    ResourceNotFoundComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BreadcrumbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminModule,
    NgxModule,
    ReactiveFormsModule,
    FileModule,
    SlickCarouselModule,
  ],
  providers: [MenuService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptorService,
    //   multi: true
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
