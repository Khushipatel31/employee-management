import { Injectable } from '@angular/core';
import { HttpServices } from './http.service';
import { catchError, map, Observable, of } from 'rxjs';
import { UserService } from './user.service';

interface login {
  email: String;
  password: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpServices, private userService: UserService) {}

  login(data: login): Observable<any> {
    return this.http.postMethod('/login', data).pipe(
      map((data: any) => {
        if (data.success) {
          this.userService.subjectUsername(data.data?.fullname);
          this.setToken(data.token);
          this.setRole(data.user.role);
        }
        return data;
      })
    );
  }

  forgotPassword(data: any) {
    return this.http.postMethod('/forgotPassword', data);
  }

  verify(): Observable<boolean> {
    return this.http.getMethod('/' + this.getRole() + '/verify').pipe(
      map((data: any) => {
        return true;
      }),
      catchError((err) => {
        return of(false);
      })
    );
  }

  getRole() {
    return localStorage.getItem('role');
  }
  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setRole(role: string) {
    localStorage.setItem('role', role);
  }
}
