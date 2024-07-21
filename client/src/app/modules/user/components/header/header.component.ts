import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminLogoutComponent } from '../../../../components/dialogs/admin-logout/admin-logout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  username: string = '';
  constructor(private userService: UserService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.userService.usernameSubject.subscribe((data: string) => {
      this.username = data;
    });
  }
  logout() {
    this.dialog.open(AdminLogoutComponent, {
      width: '600px',
      height: '600 px',
    });
  }
}
