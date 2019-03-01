import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../models/UserInfo';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {

  private readonly _URL: string;

  constructor(
    private htt: HttpClient,
    @Inject("BASE_URL") private baseUrl : string
  ) {
    this._URL = baseUrl + "api/account";
  }

  public create(userInfo: UserInfo): Observable<any> {
    return this.htt.post<any>(this._URL + "/Create", userInfo);
  }

  public login(userInfo: UserInfo): Observable<any> {
    return this.htt.post<any>(this._URL + "/Login", userInfo);
  }

  public obtenerToken(): string {
    return localStorage.getItem("token");
  }


  public obtenerTokenExpiracion(): string {
    return localStorage.getItem("tokenExpiration");
  }

  public logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }

  public estaLoguiado(): boolean {
    var exp = this.obtenerTokenExpiracion();
    if (!exp) {
      return false;
    }

    var now = new Date().getTime();
    var dateExp = new Date(exp);

    if (now >= dateExp.getTime()) {
      this.logout();
      return false;
    } else {
      return true;
    }
  }
}
