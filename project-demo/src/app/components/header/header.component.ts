import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth/auth.service";
import {AuthComponent} from "../auth/auth/auth.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginSuccess: boolean = false;
  arrayCart: any = [];


  constructor(
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.checkLogin();
    localStorage.setItem('arrayCart', JSON.stringify(this.arrayCart))
    this.authService.authen.subscribe((res) => {
      this.loginSuccess = res;
    });
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      // this.loginSuccess = true;
      this.authService.isAuthen(true);
    } else {
      this.authService.isAuthen(false);
    }
  }
  openDialog() {
    this.dialog.open(AuthComponent).afterClosed().subscribe((data: any) => {
        this.checkLogin();
      });
  }

}
