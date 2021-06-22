import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminListService} from '../../../services/admin/admin-list.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard: any[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: any[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(this.dashboard);


  constructor(private route: ActivatedRoute,
              private adminService: AdminListService,) { }

  ngOnInit(): void {
    this.getDashboard();
    this.dataSource.paginator = this.paginator;
  }

  getDashboard(){
    this.adminService.getDashboardAdmin().subscribe((res:any) => {
      console.log(res.data);
      this.dataSource.data = res.data;
      this.dashboard = res.data;
    })
  }

}
