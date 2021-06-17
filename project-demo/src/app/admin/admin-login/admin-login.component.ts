import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthComponent} from '../../components/auth/auth/auth.component';
import {CartService} from '../../services/cart/cart.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  messageError: string = '';
  // we will use reactive form
  authCredentialsDto: FormGroup;
  modalRef: BsModalRef;
  @ViewChild('invalidCredentials', {static: true}) invalidCredentialsTemp: TemplateRef<any>;

  constructor(private authService: AuthService,
              private router: Router,
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
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  userLogin() {
    this.authService.adminLogin(this.authCredentialsDto.value).subscribe(
      (res) => {
        console.log(res)
        if (res.access_token !== undefined) {
          localStorage.setItem('tokenAdmin', res.access_token);
          this.messageError = res.message;
          this._snackBar.open('Login success', 'OK');
          this.router.navigate(['admin', 'sidebar']);
        } else {
          this.messageError = res.error;
          this._snackBar.open('invalid_username_or_password', 'Try Again!');
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
