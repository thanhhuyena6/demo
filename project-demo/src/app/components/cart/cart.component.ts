import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Cart} from '../../model/cart';
import {CartItem} from '../../model/cart-item';
import {CartService} from '../../services/cart/cart.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {Product} from '../../model/product';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {element} from 'protractor';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itemsInCart: any = [];
  itemsInCartOrder: any = [];
  arrayCart: any;
  arrayCartParse: any;
  value: any;
  items: any;
  total: number = 0;
  changes: any = [];
  valueCart: number = 0;
  valueCartTotal: number = 0;
  valueCartDelete: number = 0;
  totalPriceUpdate: number = 0;
  messageError: string = '';
  removeClass: any;
  addClass: any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  dataSource = this.itemsInCart;
  subtotal: number = 0;


  constructor(private common: CommonService,
              private _snackBar: MatSnackBar,
              private _formBuilder: FormBuilder,
              private authService: AuthService) {

  }

  ngOnInit(): void {
    this.handleCart();
    this.removeClass = ('col-lg-9 col-md-9 col-sm-9');
    this.addClass = ('col-lg-12 col-md-12 col-sm-12');
    this.common.removeClass.next(this.removeClass);
    this.common.addClass.next(this.addClass);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  handleCart() {
    this.arrayCart = localStorage.getItem('arrayCart');
    this.itemsInCart = JSON.parse(this.arrayCart);
    this.itemsInCart.forEach((element: any) => {
      this.subtotal += element.price * element.quantity_order;
    });
  }

  orderProduct() {
    this.authService.checkoutProduct().subscribe(
      (res: any) => {
        this.messageError = '';
        this._snackBar.open('Please fill form', 'OK');
        this.common.checkout.next('checkout');
      }
    );
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  delete(item: any) {
    let valueCartTotal = 0;
    let valueCartDelete = 0;
    this.itemsInCart.map((element: any) => {
      valueCartTotal += element.quantity_order;

    });
    console.log(valueCartTotal);
    this.itemsInCart.splice(this.itemsInCart.indexOf(item), 1);
    this.itemsInCart.map((element: any) => {
      valueCartDelete += element.quantity_order;
    });
    console.log(valueCartDelete);
    this.itemsInCart.forEach((element: any) => {
      this.totalPriceUpdate += element.price * element.quantity_order;
      this.subtotal = this.totalPriceUpdate;
    });
    if (this.itemsInCart.length === 0) {
      this.totalPriceUpdate = this.totalPriceUpdate - this.totalPriceUpdate;
      this.subtotal = this.totalPriceUpdate;
    }
    this.valueCart = valueCartTotal - valueCartDelete;

    localStorage.setItem('arrayCart', JSON.stringify(this.itemsInCart));

    this.common.cartUpdate.next(this.valueCart);
    this.common.totalPriceUpdate.next(this.totalPriceUpdate);
  }

  minus(item: any) {
    if (item.quantity_order > 1) {
      let updateTotal = 0;
      this.itemsInCart.map((element: any) => {
        if (element.product_id === item.product_id) {
          element.quantity_order -= 1;
        }
      });

      this.itemsInCart.forEach((element: any) => {
        updateTotal += element.price * element.quantity_order;
      });
      this.subtotal = updateTotal;
      localStorage.setItem('arrayCart', JSON.stringify(this.itemsInCart));
    }
  }

  pushToCart(item: any) {
    let isInCart;
    isInCart = this.itemsInCart.some((element: any) =>
      element.product_id === item.product_id);
    if (isInCart) {
      let updateTotal = 0;
      this.itemsInCart.map((element: any) => {
        if (element.product_id === item.product_id) {
          element.quantity_order += 1;
        }
        return element;
      });
      this.itemsInCart.forEach((element: any) => {
        updateTotal += element.price * element.quantity_order;
      });
      this.subtotal = updateTotal;
      localStorage.setItem('arrayCart', JSON.stringify(this.itemsInCart));

    }
  }

  updateCart(){
    let updateQuantity = 0;
    let updatePrice = 0;
    this.itemsInCart.forEach((element:any) => {
      updateQuantity += element.quantity_order;
      updatePrice += element.price * element.quantity_order;
    })
    this.common.updateCartLast.next(updateQuantity);
    this.common.updatePriceLast.next(updatePrice);
  }

}


