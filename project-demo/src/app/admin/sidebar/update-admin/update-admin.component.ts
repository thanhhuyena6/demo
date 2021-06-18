import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminListService} from '../../../services/admin/admin-list.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CommonService} from '../../../services/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.scss']
})
export class UpdateAdminComponent implements OnInit {
  registrationForm: FormGroup;
  messageError: string = '';
  adminId: any;
  data:any;
  constructor(private fb: FormBuilder,
              private adminService: AdminListService,
              public dialogRef: MatDialogRef<UpdateAdminComponent>,
              private _snackBar: MatSnackBar,
              private common: CommonService,
              private router: Router) { }

  ngOnInit(): void {
    this.common.getAdminId.subscribe((value: any) => {
      this.adminId = value;
    })
    this.getAccAdmin();
    this.registrationForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  getAccAdmin(){
    this.adminService.getAdminDetail(this.adminId).subscribe((res:any) => {
      console.log(res.data);
      if (res) {
        this.data = res.data;
      }
    })
  }

  EditAdmin() {
    this.adminService.updateAdmin(this.adminId ,this.registrationForm.value).subscribe(
      (res : any) => {
        if (res.data){
          this.messageError = '';
          this._snackBar.open(res.message, 'OK');
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
