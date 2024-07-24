import { Component, inject } from '@angular/core';
import { AdminServices } from '../../../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifyComponent } from '../../../../../components/notify/notify.component';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrl: './employee-delete.component.css',
})
export class EmployeeDeleteComponent {
  constructor(
    private adminService: AdminServices,
    private _snackBar: MatSnackBar
  ) {}

  readonly dialogRef = inject(MatDialogRef<EmployeeDeleteComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  buttonClicked() {
    this.adminService.deleteEmployee(this.data).subscribe((data) => {
      this._snackBar.openFromComponent(NotifyComponent, {
        duration: 5 * 1000,
        data: 'Employee deleted Successfully!!',
      });
      this.dialogRef.close();
      this.adminService.fetchEmployees();
      this.adminService.getCounts();
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
