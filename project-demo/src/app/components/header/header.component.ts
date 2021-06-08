import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth/auth.service";
import {AuthComponent} from "../auth/auth/auth.component";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {CommonService} from "../../services/common.service";
import {element} from "protractor";

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
  productDetails: ProductDetailsComponent;



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
      console.log('count', count)

      this.cartNumber += count;
      console.log(this.cartNumber)
    })
  }

  totalCart(){
    this.arrayCart = localStorage.getItem('arrayCart');
    this.arrayCart = JSON.parse(this.arrayCart);
    console.log('total cart', this.arrayCart)
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
