import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-logout',
  templateUrl: './admin-logout.component.html',
  styleUrl: './admin-logout.component.css',
})
export class AdminLogoutComponent {
  constructor(private router: Router) {}

  readonly dialogRef = inject(MatDialogRef<AdminLogoutComponent>);
  buttonClicked() {
    localStorage.removeItem('token'),
      localStorage.removeItem('role'),
      this.router.navigate(['']);
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
