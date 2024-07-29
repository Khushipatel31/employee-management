import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminLogoutComponent } from '../../../../components/dialogs/admin-logout/admin-logout.component';
import { ViewEmployeeDialogComponent } from '../../../admin/components/view-employee-dialog/view-employee-dialog.component';
import { CreateLeaveComponent } from '../dialogs/create-leave/create-leave.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  username: string = '';
  profileData!: any;
  constructor(private userService: UserService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.userService.fetchProfileDetail();
    this.userService.usernameSubject.subscribe((data: string) => {
      this.username = data;
    });
    this.userService.profileViewSubject.subscribe((data) => {
      this.profileData = data;
    });
  }
  openProfileModal() {
    this.dialog.open(ViewEmployeeDialogComponent, {
      width: '650px',
      height: '650px',
      data: this.profileData,
    });
  }
  logout() {
    this.dialog.open(AdminLogoutComponent, {
      width: '600px',
      height: '600 px',
    });
  }

  createLeave() {
    this.dialog.open(CreateLeaveComponent, {
      width: '600px',
      height: '600 px',
    });
  }
}
