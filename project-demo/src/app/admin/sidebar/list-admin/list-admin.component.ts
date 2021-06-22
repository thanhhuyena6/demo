import {AfterViewInit, Component, Injectable, OnInit, ViewChild} from '@angular/core';
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
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.scss']
})


export class ListAdminComponent implements OnInit {
  PageEvent: PageEvent;
  listAdmin: any[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  length: number;
  current_page: number = 1;
  displayedColumns: any[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource(this.listAdmin);

  constructor(private route: ActivatedRoute,
              private adminService: AdminListService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private common: CommonService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAdmin();
    this.dataSource.paginator = this.paginator;
    this.common.loadAdmin.subscribe((value: any) => {
      this.getAdmin();
    });
  }

  getAdmin(){
    let paginator = '?&page=' + this.current_page;
    this.adminService.getAdmin(paginator).subscribe((res: any) => {
      this.dataSource.data = res.data.data;
      this.listAdmin = res.data.data;
      this.length = res.data.total;
      this.current_page = res.data.current_page;
    });
  }


  checkLoginAdmin() {
    if (localStorage.getItem('tokenAdmin')) {
      this.adminService.isAuthen(true);
    } else {
      this.adminService.isAuthen(false);
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
          this.adminService.deleteAdmin(id).subscribe((res:any) => {
            this.getAdmin();
            this._snackBar.open(res.message, 'OK');
          });

        }
      });
  }

  changePage(e:any){
    console.log(e);
    this.current_page = parseInt(e.pageIndex) + 1;
    console.log(this.current_page);
    this.getAdmin();
  }
}


