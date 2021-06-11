import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  messageError: string = '';


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {
    // if (this.authService.isLoggedIn()){
    //   this.router.navigate(['/home']);
    // }
  }

  // get email_address() {
  //   return this.registrationForm.get("authCredentialsDto")?.get("email_address");
  // }
  //
  // get password() {
  //   return this.registrationForm.get("authCredentialsDto")?.get("password");
  // }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
        email_address: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      // authCredentialsDto: new FormGroup({
      //   email_address: new FormControl(null, Validators.required),
      //   password: new FormControl(null)
      // }),
      // createProfileDto: new FormGroup({
      //   firstname: new FormControl(null, Validators.required),
      //   lastname: new FormControl(null, Validators.required),
      //   displayname: new FormControl(null, Validators.required),
      // })
    });
  }

  register() {
    this.authService.registerUser(this.registrationForm.value).subscribe(
      (res : any) => {
        console.log(res)
        this.messageError = '';
        this._snackBar.open(res.message, 'OK');
        // this.authService.login(this.registrationForm.value).subscribe(
        //   resToken => {
        //     localStorage.setItem('token', resToken.access_token);
        //     this.authService.prepareUserData();
        //     // this.authService.getCurrentUser().subscribe(
        //     //   resUser => {
        //     //     this.authService.currentUser = resUser;
        //     //   }
        //     // );
        //     this.router.navigate([`/home`]);
        //   }, error => {
        //     console.log(error);
        //   }
        // )
      }, error => {

      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
