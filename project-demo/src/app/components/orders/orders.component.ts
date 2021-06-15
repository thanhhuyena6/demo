import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {CommonService} from "../../services/common.service";
import {element} from "protractor";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  itemsOrders: any = [];
  arrayCart: any;
  itemsOrderProduct: any = [];
  statusOrder: any;
  orderId: any;
  constructor(private authService: AuthService,
              private common: CommonService) { }

  ngOnInit(): void {
    this.common.orderId.subscribe((value:any) =>{
      this.orderId = value;
      console.log(this.orderId)
    })
    this.showOrders();
    this.orderProduct();
    this.status();

  }

  showOrders() {
    this.authService.showOrder(this.orderId).subscribe((res:any) => {
      this.itemsOrders = res.data;
      console.log(this.itemsOrders)
      this.itemsOrders.forEach((element:any) => {
        if (element.status === '0'){
          this.statusOrder = 'Wait For Confirmaion';
        } else if (element.status === '1') {
          this.statusOrder = 'Waiting For The Goods';
        } else if (element.status === '2') {
          this.statusOrder = 'Delivering';
        } else if (element.status === '3') {
          this.statusOrder = 'Delivered';
        } else {
          this.statusOrder = 'Cancelled';
        }
      })
    })
  }

  orderProduct(){
    this.itemsOrderProduct = this.itemsOrders.products;
  }

  status() {

  }

}
