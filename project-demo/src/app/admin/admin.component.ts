import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminListService} from '../services/admin/admin-list.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private adminService: AdminListService,
              private router: Router) {}

  ngOnInit(): void {
    this.adminService.getAdmin().subscribe((res:any) => {
      console.log(res);
    })
  }

}
