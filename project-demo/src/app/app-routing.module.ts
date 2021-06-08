import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CartComponent} from "./components/cart/cart.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {CategoryListComponent} from "./components/category-list/category-list.component";
import {UserAuthGuard} from "./guards/user-auth.guard";
import {CategoryResolverService} from "./resolvers/category-resolver.service";
import {ProductResolverService} from "./resolvers/product-resolver.service";
import {ProfileResolverService} from "./resolvers/profile-resolver.service";
import {ProductListSubComponent} from "./components/product-list-sub/product-list-sub.component";
import {CartResolverService} from "./resolvers/cart-resolver.service";
import {AddressComponent} from "./components/profile/address/address.component";
import {AccountDetailsComponent} from "./components/profile/account-details/account-details.component";

const routes: Routes = [
  // {
  //   path : 'home',
  //   component: HomeComponent,
  //   data: {breadcrumbs: 'Home'}
  // },
  // {
  //   path : '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path : 'profile',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: AddressComponent,
        pathMatch: 'full',
      },
      {
        path: 'address',
        component: AddressComponent,
      },
      {
        path: 'account',
        component: AccountDetailsComponent,
      },
    ],
    canActivate: [UserAuthGuard]
  },
  {
    path : 'orders',
    component: OrdersComponent,
    canActivate: [UserAuthGuard],
    resolve: {
      cart: CartResolverService
    }
  },
  {
    path : 'cart',
    component: CartComponent,
    // resolve: {
    //   cart: CartResolverService
    // }
    canActivate: [UserAuthGuard]
  },
  // {
  //   path : 'auth',
  //   children: [
  //     {
  //       path: 'login',
  //       component: LoginComponent
  //     },
  //     {
  //       path: 'register',
  //       component: RegisterComponent
  //     }
  //   ]
  // },
  {
    path : 'products',
    component: ProductListComponent,
    resolve: {
      products: ProductResolverService
    }
  },
  // {
  //   path : 'products/:productId',
  //   component: ProductDetailsComponent,
  // },
  {
    path : 'products/:id',
    component: ProductDetailsComponent,
  },
  {
    path : 'checkout',
    component: CheckoutComponent,
  },
  {
    path : 'home',
    component: CategoryListComponent,
    resolve: {
      categories: CategoryResolverService // only if the route is : localhost:4200/categories
    }
  },
  // {
  //   path : 'categories/:id',
  //   component: CategoryDetailsComponent,
  // },
  {
    path : 'categories/:id',
    component: ProductListComponent,
    resolve: {
      products: ProductResolverService
    }
  },
  {
    path : 'subcategory/:id',
    component: ProductListSubComponent,
  },

  {
    path: 'admin', // this is the prefix route
    canActivate: [UserAuthGuard],
    //lazy loading: this module will not loaded only if the user navigate into it
    loadChildren: () => import('./admin/admin.module').then(a => a.AdminModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
