import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  changes: any = {};
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.getAccDetails();
  }

  getAccDetails() {
    this.authService.getProfile().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.changes = data;
      }
    });
  }
  saveProfile() {
    this.authService.updateProfile(this.changes).subscribe((data) => {});
  }
  savePass() {
    this.authService.updatePass(this.changes).subscribe((data) => {});
  }

}
