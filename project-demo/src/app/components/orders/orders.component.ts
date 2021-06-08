import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  itemsInCart: any = [];
  arrayCart: any;
  constructor() { }

  ngOnInit(): void {
    // this.arrayCart = localStorage.getItem('arrayCart');
    // this.itemsInCart = JSON.parse(this.arrayCart);
    // console.log(this.arrayCart)
  }

}
