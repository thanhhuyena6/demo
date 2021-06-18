import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AdminListService} from '../../../services/admin/admin-list.service';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthComponent} from '../../../components/auth/auth/auth.component';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {
  registrationForm: FormGroup;
  messageError: string = '';

  constructor(private fb: FormBuilder,
              private adminService: AdminListService,
              public dialogRef: MatDialogRef<CreateAdminComponent>,
              private _snackBar: MatSnackBar,
              private common: CommonService,
              private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  createAdmin() {
    this.adminService.createAdmin(this.registrationForm.value).subscribe(
      (res : any) => {
        console.log(res.data);
        if (res.data){
          this.messageError = '';
          this._snackBar.open('Create Admin success ', 'OK');
          this.common.loadAdmin.next('loadAdmin');
          this.dialogRef.close('success');
          this.router.navigate([`/admin/sidebar/list-admin`]);
        }
      }, error => {
        this._snackBar.open( 'Username already exists','Try Again!');
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
