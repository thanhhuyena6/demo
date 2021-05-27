// import { Injectable } from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {ErrorHandler} from "../../shared/error-handler";
// import {Observable} from "rxjs";
// import {Order} from "../../model/order";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {
//   private errorHandler: ErrorHandler = new ErrorHandler();
//   private orderUrl = `http://localhost:3000/orders/user-orders`;
//   constructor(private  http: HttpClient) { }
//
//
//   //for admin staff
//   getOrders(): Observable<Order[]>{
//     try {
//       return this.http.get<Order[]>(this.orderUrl);
//     } catch (error) {
//       this.errorHandler.handleError(error)
//     }
//   }
//
//   //for user staff
//   getUserOrder(orderId: number): Observable<Order>{
//     try {
//       return this.http.get<Order>(`${this.orderUrl}/${orderId}`);
//     } catch (error) {
//       this.errorHandler.handleError(error)
//     }
//   }
// }
