import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {CartService} from "../../../services/cart/cart.service";
import {AlertService} from "../../../services/alert/alert.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthComponent} from "../auth/auth.component";

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
      res => {
        console.log(res)
        localStorage.setItem('token', res.access_token);
        // this.authService.prepareUserData();
        this.messageError = '';
        this.dialogRef.close('success');
        this.router.navigate([`/home`]);
      },
      error => {
        this.alertService.error(error);
        this.openModal(this.invalidCredentialsTemp);
      }
    );
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }
  hide(){
    this.modalRef.hide();
  }

}
