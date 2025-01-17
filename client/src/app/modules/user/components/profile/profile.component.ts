import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) {}
  isCompleted: Number = 0;
  ngOnInit(): void {
    this.userService.fetchProfileDetail();
    this.userService.profileSubject.subscribe((data) => {
      this.isCompleted = data.profileCompleted;
    });
  }
}
