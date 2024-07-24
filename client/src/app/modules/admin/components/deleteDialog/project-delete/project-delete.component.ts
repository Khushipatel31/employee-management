import { Component, inject } from '@angular/core';
import { AdminServices } from '../../../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifyComponent } from '../../../../../components/notify/notify.component';

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrl: './project-delete.component.css',
})
export class ProjectDeleteComponent {
  constructor(
    private adminService: AdminServices,
    private _snackBar: MatSnackBar
  ) {}

  readonly dialogRef = inject(MatDialogRef<ProjectDeleteComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  buttonClicked() {
    this.adminService.deleteProject(this.data).subscribe((data) => {
      this._snackBar.openFromComponent(NotifyComponent, {
        duration: 5 * 1000,
        data: 'Project deleted Successfully!!',
      });
      this.dialogRef.close();
      this.adminService.fetchProjects();
      this.adminService.getCounts();
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
