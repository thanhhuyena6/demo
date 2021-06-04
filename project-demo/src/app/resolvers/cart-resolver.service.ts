import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Cart} from "../model/cart";
import {Observable} from "rxjs";
import {CartService} from "../services/cart/cart.service";
import {AuthService} from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<Cart>{

  constructor(private cartService: CartService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cart> {
    return this.cartService.getCart(this.authService.profile.cartId)
  }
}
