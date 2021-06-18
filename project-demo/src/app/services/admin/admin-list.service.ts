import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Category} from '../../model/category';
import {AdminList} from '../../model/admin-list';

@Injectable({
  providedIn: 'root'
})
export class AdminListService {
  private adminUrl = `https://project-demo-gumi.herokuapp.com/api/admin/index`;
  private createAdminUrl = `https://project-demo-gumi.herokuapp.com/api/admin/register`;
  private showAdminUrl = `https://project-demo-gumi.herokuapp.com/api/admin/show`;
  private updateAdminUrl = `https://project-demo-gumi.herokuapp.com/api/admin/update`;
  private deleteAdminUrl = `https://project-demo-gumi.herokuapp.com/api/admin/destroy`;

  constructor(private http: HttpClient,
              private router: Router) { }
  private authenSubject = new BehaviorSubject(false);
  getAdmin(): Observable<AdminList[]>{
    return this.http.get<AdminList[]>(this.adminUrl, { headers: this.getTokenProfile()});
  }
  getAdminDetail(adminId: any) {
    let url = `${this.showAdminUrl}/${adminId}`
    return this.http.get(`${url}`, { headers: this.getTokenProfile()});
  }
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
  isAuthen(isAuthen: boolean) {
    this.authenSubject.next(isAuthen);
  }

  createAdmin(registrationInfo: any): Observable<void> {
    return this.http.post<void>(this.createAdminUrl, registrationInfo, { headers: this.getTokenProfile()});
  }

  updateAdmin(id: any ,body: any) {
    let url = `${this.updateAdminUrl}/${id}`;
    return this.http.put( url, body, {
      headers: this.getTokenProfile(),
    });
  }

  deleteAdmin(id : any){
    let url = `${this.deleteAdminUrl}/${id}`;
    return this.http.delete(url, {
      headers: this.getTokenProfile(),
    });
  }
}
