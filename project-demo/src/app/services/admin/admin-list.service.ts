import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Category} from '../../model/category';
import {AdminList} from '../../model/admin-list';

@Injectable({
  providedIn: 'root'
})
export class AdminListService {
  private adminUrl = `https://project-demo-gumi.herokuapp.com/api/admin/index`;

  constructor(private http: HttpClient,
              private router: Router) { }
  getAdmin(): Observable<AdminList[]>{
    return this.http.get<AdminList[]>(this.adminUrl, { headers: this.getTokenProfile()});
  }
  getTokenProfile() {
    let authHeader;
    const profile = localStorage.getItem('tokenAdmin');
    // const getProfile:any = JSON.parse(profile)
    // this.token = JSON.parse(this.token);
    if (profile) {
      const token = `Bearer ${profile}`;
      authHeader = new HttpHeaders({
        Authorization: token,
      });
    }
    return authHeader;
  }
}
