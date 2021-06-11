import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorHandler} from "../../shared/error-handler";
import {Observable} from "rxjs";
import {Order} from "../../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private errorHandler: ErrorHandler = new ErrorHandler();
  private orderUrl = `http://localhost:3000/orders/user-orders`;
  constructor(private  http: HttpClient) { }


  //for admin staff
  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.orderUrl);
  }

  //for user staff
  getUserOrder(orderId: number): Observable<Order>{
    return this.http.get<Order>(`${this.orderUrl}/${orderId}`);
  }
}
