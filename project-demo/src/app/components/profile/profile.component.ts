import {Component, OnInit} from '@angular/core';
import {Profile} from "../../model/profile";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  modalRef: BsModalRef;

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              private router: Router,
  ) {
  }

  updateObject = {
    firstname: null,
    last_name: null,
    display_name: null,
    email_address: null,
    phone: null,
    address: null,
  }

  ngOnInit(): void {
  }

  openLogout() {
    this.dialog
      .open(DialogComponent, {
        data: {
          message: 'Do you want to logout?',
          confirmButton: 'Yes',
          cancelButton: 'No',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        // localStorage.clear();
        console.log(res);
        if (res === 'success') {
          this.authService.logout();
          localStorage.removeItem('token');
          this.router.navigate(['/home']);
          this.authService.isAuthen(false);
        }
      });
  }


}
