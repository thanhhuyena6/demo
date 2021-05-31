import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {Router} from "@angular/router";
import {ErrorHandler} from "../../shared/error-handler";
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {Profile} from "../../model/profile";
import {Cart} from "../../model/cart";
import {CartItem} from "../../model/cart-item";
import {UserData} from "../../model/user-data";
import {Order} from "../../model/order";
import {Invoice} from "../../model/invoice";
import {Payment} from "../../model/payment";
// import {CartService} from "../cart/cart.service";

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
  _registerUrl = `https://gumistore.herokuapp.com/api/public/register`;
  _loginUrl = `https://gumistore.herokuapp.com/api/public/login`;
  _userUrl = `https://gumistore.herokuapp.com/api/public/profile`;
  _profileUrl = `https://gumistore.herokuapp.com/api/public/profile`;
  private _usersURL = `http://localhost:3000/auth/system-users`;
  private _userDataURL = `https://gumistore.herokuapp.com/api/public/profile`;

  private imageChangeUrl = `http://localhost:3000/profile/userprofile/changeprofileimage`;
  private newImageUrl = `http://localhost:3000/profile/userprofile/setprofileimage`;
  private contactUrl = `http://localhost:3000/contacts/new-mail`;
  private _usersUrl = 'http://localhost:3000/auth/system-users';
  errorsHandler = new ErrorHandler();
  public username: string;
  public cart: Cart;
  public cartItem: CartItem;
  public profile: Profile;
  public currentUser: User;

  registerUser(registrationInfo: any): Observable<void> {
    return this.http.post<void>(this._registerUrl, registrationInfo);
  }


  prepareUserData() {
    if (this.isLoggedIn()) {
      this.getCurrentUser().subscribe(resUser => {
        this.currentUser = resUser;
      });
      this.pUserData().subscribe(uData => {
        this.profile = uData.profile;
        this.username = `${uData.profile.firstname}
        ${uData.profile.lastname}`;
      });
    }
  }

  // refreshInfo() {
  //   if (this.isLoggedIn()) {
  //     this.pUserData().subscribe(uData => {
  //       this.profile = uData.profile;
  //       this.cart = uData.cart;
  //       this.cartItem = uData.cartItem;
  //     });
  //   }
  // }

  pUserData(): Observable<UserData> {

    return this.http.get<UserData>(this._userDataURL);
  }

  messageContact(messageForm: any): Observable<void> {
    return this.http.post<void>(this.contactUrl, messageForm);
  }

  // updateProfile(updateForm): Observable<Profile> {
  //   return this.http.put<Profile>(
  //     `${this._profileUrl}/userprofile/edit`,
  //     updateForm
  //   );
  // }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this._userUrl}`);
  }

  getSystemUsers(): Observable<User[]> {
    return this.http.get<User[]>(this._usersUrl);
  }

  // changeProfileImage(imageForm): Observable<Profile> {
  //   return this.http.patch<Profile>(this.imageChangeUrl, imageForm);
  // }

  // addProfileImage(imageForm): Observable<Profile> {
  //   return this.http.post<Profile>(this.newImageUrl, imageForm);
  // }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this._usersURL);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this._loginUrl, user);
  }


  getUserProfile(): Observable<Profile> {
    return this.http.get<Profile>(this._profileUrl);
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
