import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {Router} from "@angular/router";
import {ErrorHandler} from "../../shared/error-handler";
import {Observable, BehaviorSubject} from "rxjs";
import {User} from "../../model/user";
import {Profile} from "../../model/profile";
import {Cart} from "../../model/cart";
import {CartItem} from "../../model/cart-item";
import {UserData} from "../../model/user-data";
import {Order} from "../../model/order";
import {Invoice} from "../../model/invoice";
import {Payment} from "../../model/payment";
import {CartService} from "../cart/cart.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    // private cartService: CartService
  ) {
  }
  private authenSubject = new BehaviorSubject(false);
  authen = this.authenSubject.asObservable();
  _registerUrl = `https://project-demo-gumi.herokuapp.com/api/home/user/register`;
  _loginUrl = `https://project-demo-gumi.herokuapp.com/api/home/user/login`;
  _logoutUrl = `https://project-demo-gumi.herokuapp.com/api/home/user/logout`;
  _profileUrl = `http://project-demo-gumi.herokuapp.com/api/home/user/show`;
  _updateUrl = `http://project-demo-gumi.herokuapp.com/api/home/user/update`
  _checkoutUrl = `https://project-demo-gumi.herokuapp.com/api/home/user/checkout`
  _cartOrderUrl = `https://project-demo-gumi.herokuapp.com/api/home/user/cart/order`;
  private _usersURL = `http://localhost:3000/auth/system-users`;
  // private _userDataURL = `http://localhost:3000/auth/profile`;

  private imageChangeUrl = `http://localhost:3000/profile/userprofile/changeprofileimage`;
  private newImageUrl = `http://localhost:3000/profile/userprofile/setprofileimage`;
  private contactUrl = `http://localhost:3000/contacts/new-mail`;
  // private _usersUrl = 'http://localhost:3000/auth/system-users';
  errorsHandler = new ErrorHandler();
  public username: string;
  public cart: Cart;
  public cartItem: CartItem;
  public profile: Profile;
  // token: any;
  // getProfile: any;
  public currentUser: User;

  isAuthen(isAuthen: boolean) {
    this.authenSubject.next(isAuthen);
  }

  registerUser(registrationInfo: any): Observable<void> {
    return this.http.post<void>(this._registerUrl, registrationInfo);
  }
  order(checkoutInfo:any): Observable<void>{
    return this.http.post<void>(this._cartOrderUrl, checkoutInfo);
  }

  checkoutProduct(info: any) : Observable<void>{
    return this.http.post<void>(this._checkoutUrl, info)
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this._loginUrl, user);
  }

  getUserProfile(): Observable<Profile> {
    return this.http.get<Profile>(this._profileUrl);
  }

  getTokenProfile() {
    let authHeader;
    const profile = localStorage.getItem('token');
    // const getProfile:any = JSON.parse(profile)
    // this.token = JSON.parse(this.token);
    console.log(profile)
    if (profile) {
      const token = `Bearer ${profile}`;
      authHeader = new HttpHeaders({
        Authorization: token,
      });
    }
    console.log(authHeader)
    return authHeader;
  }

  logout() {
    return this.http.get(`${this._logoutUrl}`);
  }

  getProfile() {
    return this.http.get(`${this._profileUrl}`, { headers: this.getTokenProfile()});
  }

  updateProfile(body: any) {
    return this.http.put(`${this._updateUrl}`, body, {
      headers: this.getTokenProfile(),
    });
  }
  updatePass(body: any) {
    return this.http.put(`${this._updateUrl}/changepass`, body, {
      headers: this.getTokenProfile(),
    });
  }
  updateAddress(body: any) {
    return this.http.put(`${this._profileUrl}/changeaddress`, body, {
      headers: this.getTokenProfile(),
    });
  }


  // prepareUserData() {
  //   if (this.isLoggedIn()) {
  //     this.getCurrentUser().subscribe(resUser => {
  //       this.currentUser = resUser;
  //     });
  //     this.pUserData().subscribe(uData => {
  //       this.profile = uData.profile;
  //       this.username = `${uData.profile.firstname}
  //       ${uData.profile.lastname}`;
  //     });
  //   }
  // }

  // refreshInfo() {
  //   if (this.isLoggedIn()) {
  //     this.pUserData().subscribe(uData => {
  //       this.profile = uData.profile;
  //       this.cart = uData.cart;
  //       this.cartItem = uData.cartItem;
  //     });
  //   }
  // }

  // pUserData(): Observable<UserData> {
  //
  //   return this.http.get<UserData>(this._userDataURL);
  // }

  messageContact(messageForm: any): Observable<void> {
    return this.http.post<void>(this.contactUrl, messageForm);
  }

  // updateProfile(updateForm): Observable<Profile> {
  //   return this.http.put<Profile>(
  //     `${this._profileUrl}/userprofile/edit`,
  //     updateForm
  //   );
  // }

  // getCurrentUser(): Observable<User> {
  //   const urlUserById = `${this._userUrl}`;
  //   return this.http.get<User>(urlUserById);
  // }
  //
  // getSystemUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this._usersUrl);
  // }

  // changeProfileImage(imageForm): Observable<Profile> {
  //   return this.http.patch<Profile>(this.imageChangeUrl, imageForm);
  // }

  // addProfileImage(imageForm): Observable<Profile> {
  //   return this.http.post<Profile>(this.newImageUrl, imageForm);
  // }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this._usersURL);
  }






  userLogout() {
    this.router.navigate(["/auth/login"]);
    return localStorage.removeItem("token");
  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
