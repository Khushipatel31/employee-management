import { inject, Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { HttpServices } from '../services/http.service';
import { catchError, map, Observable } from 'rxjs';
import { of } from 'rxjs';
import { AdminServices } from '../services/admin.service';
// import { UserService } from '../services/user.services';

const AuthGuard = (role: String) => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const http = inject(HttpServices);
    const adminService = inject(AdminServices);
    // const userService=inject(UserService)
    if (role == 'admin') {
      return http.getMethod('/admin/verify').pipe(
        map((data: any) => {
          if (data.success) {
            // adminService.updateName(data.data.name)
            return true;
          }
          return createUrlTreeFromSnapshot(route, ['/login']);
        }),
        catchError((error) => {
          console.error('Verification failed:', error);
          return of(createUrlTreeFromSnapshot(route, ['/login']));
        })
      );
    } else if (role == 'user') {
      return http.getMethod('/user/verify').pipe(
        map((data) => {
          if (data.success) {
            // userService.updateUserName(data.data.name);
            return true;
          }
          return createUrlTreeFromSnapshot(route, ['/login']);
        }),
        catchError((error) => {
          return of(createUrlTreeFromSnapshot(route, ['/login']));
        })
      );
    } else {
      return createUrlTreeFromSnapshot(route, ['/login']);
    }
  };
};
export default AuthGuard;
