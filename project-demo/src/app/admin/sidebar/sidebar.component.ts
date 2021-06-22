import { Component, OnInit } from '@angular/core';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AdminListService} from '../../services/admin/admin-list.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public adminService: AdminListService,
              private router: Router,) { }

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
        if (res === 'success') {
          this.adminService.logout();
          localStorage.removeItem('tokenAdmin');
          this.router.navigate(['/admin']);
          this.adminService.isAuthen(false);
        }
      });
  }

}
