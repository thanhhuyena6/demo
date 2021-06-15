import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {CartService} from "../../../services/cart/cart.service";
import {AlertService} from "../../../services/alert/alert.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthComponent} from "../auth/auth.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  messageError: string = '';
  // we will use reactive form
  authCredentialsDto: FormGroup;
  modalRef: BsModalRef;
  @ViewChild('invalidCredentials', {static: true}) invalidCredentialsTemp: TemplateRef<any>;

  constructor(private authService: AuthService,
              private router: Router,
              public dialogRef: MatDialogRef<AuthComponent>,
              private cartService: CartService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private modalService: BsModalService,
              private alertService: AlertService) {
    // if (this.authService.isLoggedIn()){
    //   this.router.navigate(['/home']);
    // }
  }

  ngOnInit(): void {
    this.authCredentialsDto = this.fb.group({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  userLogin() {
    this.authService.login(this.authCredentialsDto.value).subscribe(
      (res) => {
        console.log(res)
        if (res.access_token !== undefined) {
          localStorage.setItem('token', res.access_token);
          this.messageError = res.message;
          this._snackBar.open(res.message, 'OK');
          this.dialogRef.close('success');
          this.router.navigate([`/home`]);
        } else {
          this.messageError = res.error;
          this._snackBar.open(this.messageError, 'Try Again!');
        }
      }
    );
  }

  // openModal(template: TemplateRef<any>){
  //   this.modalRef = this.modalService.show(template);
  // }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  hide(){
    this.modalRef.hide();
  }

}
