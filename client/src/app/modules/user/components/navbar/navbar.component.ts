import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  manager: Boolean = false;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.profileSubject.subscribe((data) => {
      this.manager = data.designation?.is_manager;
    });
  }
}
