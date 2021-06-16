import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public cartNumber = new BehaviorSubject<any>(0)
  public cartUpdate = new BehaviorSubject<any>(0)
  public totalPrice = new BehaviorSubject<any>(0)
  public totalPriceUpdate = new BehaviorSubject<any>(0)
  public toggleSideNav = new BehaviorSubject<any>(true)
  public removeClass = new BehaviorSubject<any>(0)
  public addClass = new BehaviorSubject<any>(0)
  public orderId = new BehaviorSubject<any>(0)
  public remove = new BehaviorSubject<any>(0)
  public checkout = new BehaviorSubject<any>(0)
  public updateCartLast = new BehaviorSubject<any>(0)
  public updatePriceLast = new BehaviorSubject<any>(0)
  constructor() { }
}
