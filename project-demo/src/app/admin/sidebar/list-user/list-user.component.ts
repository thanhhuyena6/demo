import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserListService} from '../../../services/admin/user-list.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DialogComponent} from '../../../shared/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  listUser: any[] = [];
  PageEvent: PageEvent;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  length: number;
  current_page: number = 1;
  displayedColumns: any[] = ['position', 'name', 'email', 'phone', 'address', 'action'];
  dataSource = new MatTableDataSource(this.listUser);


  constructor(private route: ActivatedRoute,
              private userService: UserListService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getUserList();
    this.dataSource.paginator = this.paginator;
  }

  getUserList(){
    this.userService.getUser().subscribe((res:any) => {
      this.dataSource.data = res.data;
      this.listUser = res.data;
      this.length = res.data.total;
      this.current_page = res.data.current_page;
    })
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
        this.userService.deleteUser(id).subscribe((res:any) => {
          this.getUserList();
          this._snackBar.open('User delete successfully', 'OK');
        });

      }
    });
  }

  changePage(e:any){
    console.log(e);
    this.current_page = parseInt(e.pageIndex) + 1;
    console.log(this.current_page);
    this.getUserList();
  }

}
