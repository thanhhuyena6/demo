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

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart;
  cartItem: CartItem;
  modalRef: BsModalRef;
  dataSource: MatTableDataSource<Product[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [
    'Number',
    'Name',
    'Price',
    'Quantity',
    'Actions'
  ];
  checkoutDto: FormGroup;
  selectedPaymentMethod = "";
  paymentMethods: string[] = [
    'VISA',
    'PAYPAL',
    'CASH_ON_DELIVERY',
    'MASTERCARD'
  ];

  constructor(private cartService: CartService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private modalService: BsModalService,
              private router: Router) {
    this.prepareCartData()
  }

  ngOnInit(): void {
    // this.checkoutDto = this.fb.group({
    //   createPaymentDto: this.fb.group({
    //     payment_method: new FormControl(null, Validators.required)
    //   }),
    //   createOrderDto: this.fb.group({
    //     comments: new FormControl(null, Validators.required)
    //   })
    // })

    // this.prepareCartData()
  }

  prepareCartData() {
    if (this.authService.isLoggedIn()) {

    }
  }

  refreshCartData() {
    if (this.authService.cartItem) {
      this.cartService.getCartItem(this.authService.cartItem.id)
        .subscribe((res:any) => {
          this.cartItem = res ;
        })
    }
  }

  openDialog(template: TemplateRef<any>){
    this.dialog.open(template);
  }

  hideDialog(){
    this.dialog.closeAll();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
  }

  hideModal() {
    this.modalRef.hide();
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  removeFromCart(productId: number){
    const array = this.cartItem.products;
    this.cartService.removeFromCart(this.cartItem.id, productId)
      .subscribe((res:any)=> {
        this.cartItem = res;
        this.openSnackBar('product removed successfully', 'OK');
      }, (error: Error) => {
        this.openSnackBar(`An error has occurred ${error.message}`,'OK')
      })
  }

  completeCheckout(){
    this.cartService.checkout(this.cartItem.id, this.checkoutDto.value)
      .subscribe((res:any) => {
        this.openSnackBar('order created successfully', 'OK')
        this.router.navigate(['/orders'], {
          queryParams: {
            NewOrder: true
          }
        })
      },(error: Error) => {
        this.openSnackBar(`An error has occurred ${error.message}`,'OK')
      })
  }


}


