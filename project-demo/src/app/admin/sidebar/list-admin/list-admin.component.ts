import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminListService} from '../../../services/admin/admin-list.service';
import {AuthComponent} from '../../../components/auth/auth/auth.component';
import {MatDialog} from '@angular/material/dialog';
import {CreateAdminComponent} from '../create-admin/create-admin.component';
import {CommonService} from '../../../services/common.service';
import {UpdateAdminComponent} from '../update-admin/update-admin.component';
import {MatSort} from '@angular/material/sort';
import {DialogComponent} from '../../../shared/dialog/dialog.component';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.scss']
})

export class ListAdminComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource();

  constructor(private route: ActivatedRoute,
              private adminService: AdminListService,
              private authService: AdminListService,
              private dialog: MatDialog,
              private common: CommonService,
              private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.adminService.getAdmin().subscribe((res: any) => {
      this.dataSource = res.data;
    });
    this.dataSource.paginator = this.paginator;
    this.common.loadAdmin.subscribe((value: any) => {
      this.adminService.getAdmin().subscribe((res: any) => {
        this.dataSource = res.data;
      });
    });

  }


  checkLoginAdmin() {
    if (localStorage.getItem('tokenAdmin')) {
      this.authService.isAuthen(true);
    } else {
      this.authService.isAuthen(false);
    }

  }

  openDialog() {
    this.dialog.open(CreateAdminComponent).afterClosed().subscribe((data: any) => {
      this.checkLoginAdmin();
    });
  }

  openDialogEdit(id: any) {
    this.common.getAdminId.next(id);
    this.dialog.open(UpdateAdminComponent).afterClosed().subscribe((data: any) => {
      this.checkLoginAdmin();
    });
  }

  delete(id: number) {
    this.dialog
      .open(DialogComponent, {
        data: {
          message: 'Do you want to delete it?',
          confirmButton: 'Yes',
          cancelButton: 'No',
        },
      }).afterClosed().subscribe((res) => {
        if (res) {
          this.adminService.deleteAdmin(id).subscribe((data) => {
            // this.common.loadAdmin.next('loadAdmin')
            this.adminService.getAdmin().subscribe((res: any) => {
              this.dataSource = res.data;
            });
          });
        }
      });
  }
}


