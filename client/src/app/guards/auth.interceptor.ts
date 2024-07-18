import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    let authReq = req;
    if (token && role) {
      authReq = req.clone({
        setHeaders: {
          token: token,
          role: role
        }
      });
    }
    return next.handle(authReq);
  }
}