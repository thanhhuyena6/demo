import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginComponent} from "../auth/login/login.component";
import {newArray} from "@angular/compiler/src/util";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  messageError: string = '';
  itemsInCart: any = [];
  itemsInCartOrder: any = [];
  orderItems: any = [];
  arrayCart: any;
  arrayCartParse: any;
  value: any;
  items: any;
  itemsOrder: any;
  name_total: any;
  toggle:any;
  subtotal: number = 0;
  total_price_product: number = 0;
  total_price: number = 0;
  isCheck: boolean = false;
  orderId: any;


  constructor(private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private common: CommonService,
              private authService: AuthService,) {
  }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      email_address: new FormControl(null, Validators.required),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),

    });
    this.common.checkout.subscribe((toggle:any) => {
      let total_price_product = 0;
      this.getChange();
      for (let i = 0; i < this.itemsInCart.length ; i++) {
        total_price_product += (this.itemsInCart[i].price * this.itemsInCart[i].quantity_order);
      }
      this.total_price_product = total_price_product;
      this.itemsOrder = {
        checkoutForm: [this.checkoutForm.value],
        itemsInCart: this.itemsInCart,
        total_price: this.total_price_product
      }

    })

  }

  getChange() {
    this.arrayCart = localStorage.getItem('arrayCart');
    this.itemsInCart = JSON.parse(this.arrayCart);
    this.itemsOrder = {
      checkoutForm: [this.checkoutForm.value],
      itemsInCart: this.itemsInCart,
      total_price: this.total_price_product
    }
  }




  checkout() {
    this.authService.order(this.itemsOrder).subscribe(
      (res: any) => {
        this.orderId = res.data.id;
        this.common.orderId.next(this.orderId);
        this.common.remove.next(0);
        this.messageError = '';
        localStorage.removeItem('arrayCart');
        this._snackBar.open('Please click order below Cart!', 'OK');
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
