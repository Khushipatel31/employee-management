import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usernameSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  constructor() {}
  subjectUsername(name: any): void {
    this.usernameSubject.next(name);
  }
}
