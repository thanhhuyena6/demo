import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {CommonService} from "../../services/common.service";

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
    })
  }

  orderProduct(){
    this.itemsOrderProduct = this.itemsOrders.products;
  }

  status() {
    if (this.itemsOrders.status === 0){
      this.statusOrder = 'WaitForConfirmaion';
    } else if (this.itemsOrders.status === 1) {
      this.statusOrder = 'WaitingForTheGoods';
    } else if (this.itemsOrders.status === 2) {
      this.statusOrder = 'Delivering';
    } else if (this.itemsOrders.status === 3) {
      this.statusOrder = 'Delivered';
    } else {
      this.statusOrder = 'Cancelled';
    }
  }

}
