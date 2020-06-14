import { UserModel } from './../Interfaces/user-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators/';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string = environment.apiUrl + 'Account/';

  constructor(private http: HttpClient, private router: Router) { }

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string>(localStorage.getItem('username'));



  login(model: UserModel) {
    return this.http.post<any>(this.baseUrl + "login", model).pipe(
      map(result => {
        if (result && result.token) {
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('jwt', result.token);
          localStorage.setItem('username', result.user.userName);
          localStorage.setItem('userPicture', result.user.userPicture);
          this.UserName.next(localStorage.getItem('username'));
        }
        return result;
      })

    );
  }


  Register(model: UserModel) {
    return this.http.post<any>(this.baseUrl + "register", model).pipe(
      map(result => { return result; },
        error => { return error }
      )
    )
  }








  checkLoginStatus(): boolean {

    var loginCookie = localStorage.getItem("loginStatus");

    if (loginCookie == "1") {
      if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
        return false;
      }


      if (!this.IsExpired()) {
        return true;
      }
    }
    return false;
  }

  logout() {
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.removeItem('Role');
    this.loginStatus.next(false);

  }

  IsExpired(): boolean {

    const helper = new JwtHelperService();
    var token = localStorage.getItem('jwt');
    const decodedToken = helper.decodeToken(token);
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);

    if (isExpired) {
      // alert('isExpired => ' + isExpired)
      return true;
    }
    // alert('isExpired => ' + isExpired)
    return false

  }

  public get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

}
