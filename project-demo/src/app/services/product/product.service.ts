import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ErrorHandler} from "../../shared/error-handler";
import {Observable} from "rxjs";
import {Product} from "../../model/product";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `http://project-demo-gumi.herokuapp.com/api/home/data_category`;
  private urlDetail = `https://project-demo-gumi.herokuapp.com/api/home/product/index`;

  constructor(private  http: HttpClient, private authService: AuthService,
              private router: Router) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id: any): Observable<Product>{
    const urlById = `${this.url}/${id}`;
    return this.http.get<Product>(urlById);
  }
  getProductDetailById(id: any): Observable<Product>{
    const urlByIdDetail = `${this.urlDetail}/${id}`;
    return this.http.get<Product>(urlByIdDetail);
  }

  insertToCart(productId: number, cartItemId: number, cartQuantity: number): Observable<Product> {
    const params = new  HttpParams().set('quantity', cartQuantity.toString());
    const urlById = `${this.url}/${productId}/addtocart/${cartItemId}`
    return this.http.post<Product>(urlById, null, {
      params: params
    });
  }

  updateProductCartQuantity(productId: number, cartQuantity: number): Observable<void>{
    const params = new  HttpParams().set('cartQuantity', cartQuantity.toString());
    const urlById = `${this.url}/${productId}/update-quantity`
    return this.http.patch<void>(urlById, null, {
      params: params
    });
  }

  viewProductDetails(product: Product){
    this.router.navigate(['products', product.id], {
      // queryParams: {
      //   Name: product.name
      // }
    })
  }
}
