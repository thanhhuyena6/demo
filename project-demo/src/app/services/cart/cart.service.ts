import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart} from "../../model/cart";
import {ErrorHandler} from "../../shared/error-handler";
import {CartItem} from "../../model/cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private  http: HttpClient) { }
  private  _cartUrl = `http://localhost:3000/cart`;
  private  _cartItemUrl = `http://localhost:3000/cart_items`;
  private errorHandler: ErrorHandler = new ErrorHandler();

  getCart(id: number): Observable<Cart>{
    const urlById = `${this._cartUrl}/${id}`;
    return this.http.get<Cart>(urlById);
  }
  getCartItem(id: number): Observable<CartItem>{
    const urlById = `${this._cartItemUrl}/${id}`;
    return this.http.get<CartItem>(urlById);
  }

  clearCartProducts(cartItemId: number): Observable<CartItem> {
    const  clearUrl = `${this._cartItemUrl}/${cartItemId}/products/clear-products`
    return this.http.delete<CartItem>(clearUrl);
  }

  placeOrder(cartItemId:number, productId: number,
             createOrderDto: any): Observable<void>{
    const orderUrl = `${this._cartItemUrl}/${cartItemId}/products/${productId}/placeorder`
    return this.http.post<void>(orderUrl, createOrderDto);
  }

  removeFromProduct(cartItemId:number, productId: number): Observable<CartItem>{
    const  removeUrl = `${this._cartItemUrl}/${cartItemId}/products/${productId}/remove-from-cart`
    return this.http.delete<CartItem>(removeUrl);
  }

  checkout(cartItemId: number, createOrderDto: any): Observable<void>{
    const orderUrl = `${this._cartItemUrl}/${cartItemId}/checkout`
    return this.http.post<void>(orderUrl, createOrderDto);
  }
}
