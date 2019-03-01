import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { AccountService } from './account.service';
import { HttpRequest } from 'selenium-webdriver/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private accountService: AccountService
  ) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    var token = this.accountService.obtenerToken();
    req = req.clone({
      setHeaders: { Authorization: "bearer " + token }
    });
    return next.handle(req);
  }

}
