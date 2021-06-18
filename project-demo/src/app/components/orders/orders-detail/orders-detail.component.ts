import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {CommonService} from "../../../services/common.service";
import {element} from "protractor";

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {
  orderId: any;
  itemsOrders: any = [];
  itemsOrderProduct: any = [];



  constructor(private authService: AuthService,
              private common: CommonService) { }

  ngOnInit(): void {
    this.common.orderId.subscribe((value:any) =>{
      this.orderId = value;
    })
    this.showOrders();
  }

  showOrders() {
    this.authService.showOrder(this.orderId).subscribe((res:any) => {
      this.itemsOrders = res.data;
      console.log(this.itemsOrders)
    })
  }

  orderProduct(){
    this.itemsOrderProduct = this.itemsOrders.products;

  }

}
