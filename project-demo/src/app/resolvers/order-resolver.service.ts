import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Order} from "../model/order";
import {Observable} from "rxjs";
import {OrderService} from "../services/order/order.service";

@Injectable({
  providedIn: 'root'
})
export class OrderResolverService implements Resolve<Order[]>{

  constructor(private orderService: OrderService) { }

  //for admin panel
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order[]>{
    return this.orderService.getOrders();
  }
}
