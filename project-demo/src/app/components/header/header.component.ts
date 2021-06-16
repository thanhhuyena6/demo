import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth/auth.service";
import {AuthComponent} from "../auth/auth/auth.component";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {CommonService} from "../../services/common.service";
import {element} from "protractor";
import {count} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginSuccess: boolean = false;
  arrayCart: any = [];
  quantity:any;
  cartNumber : number = 0;
  totalPrice: number = 0;
  open: boolean = false;
  productDetails: ProductDetailsComponent;
  removeClass: any;
  addClass: any;



  constructor(
    public dialog: MatDialog,
    private common: CommonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    localStorage.setItem('arrayCart', JSON.stringify(this.arrayCart))
    this.authService.authen.subscribe((res) => {
      this.loginSuccess = res;
    });
    this.common.cartNumber.subscribe((count:any) => {
      this.cartNumber += count;
    })
    this.common.cartUpdate.subscribe((value:any) => {
      this.cartNumber -= value;
    })
    this.common.updateCartLast.subscribe((value:any) => {
      this.cartNumber = value;
    })
    this.common.totalPrice.subscribe((value:any) => {
      this.totalPrice = value;
    })
    this.common.totalPriceUpdate.subscribe((value:any) => {
      this.totalPrice = value;
    })
    this.common.updatePriceLast.subscribe((value:any) => {
      this.totalPrice = value;
    })
    this.common.remove.subscribe((value:any) => {
      this.cartNumber = value;
      this.totalPrice = value;
    })
    this.removeClass = ('col-lg-9 col-md-9 col-sm-9');
    this.addClass = ('col-lg-12 col-md-12 col-sm-12');

  }

  totalCart(){
    this.arrayCart = localStorage.getItem('arrayCart');
    this.arrayCart = JSON.parse(this.arrayCart);
    console.log('total cart', this.arrayCart)
  }

  toggleSideNav() {
    this.common.toggleSideNav.next(this.open)
    this.common.removeClass.next(this.removeClass);
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      // this.loginSuccess = true;
      this.authService.isAuthen(true);
    } else {
      this.authService.isAuthen(false);
    }

  }
  openDialog() {
    this.dialog.open(AuthComponent).afterClosed().subscribe((data: any) => {
        this.checkLogin();
      });
  }

}
