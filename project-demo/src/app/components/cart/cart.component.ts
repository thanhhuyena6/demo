import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Cart} from "../../model/cart";
import {CartItem} from "../../model/cart-item";
import {CartService} from "../../services/cart/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../../model/product";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {element} from "protractor";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itemsInCart: any = [];
  arrayCart: any;
  arrayCartParse: any;
  value: any;
  items: any;
  total: number = 0;
  changes: any = [];


  constructor(private cartService: CartService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private modalService: BsModalService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.handleCart();
    this.getChange()
  }

  getChange(){
    this.itemsInCart.forEach((element:any) => {
      console.log(element)
    })
  }

  handleCart(){
    this.arrayCart = localStorage.getItem('arrayCart');
    this.itemsInCart = JSON.parse(this.arrayCart);
    this.itemsInCart.forEach((element:any) => {
      console.log(element)
      this.total += element.subtotal
    })
  }

  delete(item : any){
    this.itemsInCart.splice(this.itemsInCart.indexOf(item),1)
    // this.value = 0;
    localStorage.setItem('arrayCart', JSON.stringify(this.itemsInCart));
  }

  minus(){
    console.log(this.itemsInCart)
  }
  pushToCart(item: any) {
    console.log(this.itemsInCart)

  }



}


