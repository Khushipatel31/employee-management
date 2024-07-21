import { Component } from '@angular/core';
import { AdminServices } from '../../../../services/admin.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminLogoutComponent } from '../../../../components/dialogs/admin-logout/admin-logout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: String = '';
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  logout() {
    this.dialog.open(AdminLogoutComponent, {
      width: '600px',
      height: '600 px',
    });
  }
}
