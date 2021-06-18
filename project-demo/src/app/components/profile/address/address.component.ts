import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  data: any = {};
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.getAccDetails()
  }

  getAccDetails() {
    this.authService.getProfile().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.data = data;
      }
    });
  }

  saveAddress() {
    this.authService.updateAddress(this.data).subscribe((data) => {});
  }

}
