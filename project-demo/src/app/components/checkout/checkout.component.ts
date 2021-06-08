import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  messageError: string = '';
  itemsInCart: any = [];
  arrayCart: any;
  arrayCartParse: any;
  value: any;
  items: any;
  total: number = 0;

  constructor(private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private authService: AuthService,) { }

  ngOnInit(): void {
    this.arrayCart = localStorage.getItem('arrayCart');
    this.itemsInCart = JSON.parse(this.arrayCart);
    console.log(this.itemsInCart)
    this.itemsInCart.forEach((element:any) => {
      console.log(element)
      this.total += element.subtotal
    })
    this.checkoutForm = this.fb.group({
      email_address: new FormControl(null, Validators.required),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),

    });
  }

  checkout() {
    this.authService.order(this.checkoutForm.value).subscribe(
      (res : any) => {
        console.log(res)
        this.messageError = '';
        this._snackBar.open(res.message, 'OK');
      }, error => {

      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
