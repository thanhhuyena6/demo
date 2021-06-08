import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public cartNumber = new BehaviorSubject<any>(0)
  public toggleSideNav = new BehaviorSubject<any>(true)
  constructor() { }
}
