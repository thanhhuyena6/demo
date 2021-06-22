import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AdminList} from '../../model/admin-list';
import {UserList} from '../../model/user-list';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private userUrl = `https://project-demo-gumi.herokuapp.com/api/admin/user/index?keyword=.com`;
  private deleteUserUrl = `https://project-demo-gumi.herokuapp.com/api/admin/user/destroy`;

  constructor(private http: HttpClient,
              private router: Router) { }

  getTokenProfile() {
    let authHeader;
    const profile = localStorage.getItem('tokenAdmin');
    if (profile) {
      const token = `Bearer ${profile}`;
      authHeader = new HttpHeaders({
        Authorization: token,
      });
    }
    return authHeader;
  }

  getUser(): Observable<UserList[]>{
    return this.http.get<UserList[]>(`${this.userUrl}`, { headers: this.getTokenProfile()});
  }

  deleteUser(id : any){
    let url = `${this.deleteUserUrl}/${id}`;
    return this.http.delete(url, {
      headers: this.getTokenProfile(),
    });
  }


}
