import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../../services/user.service';
import { NotifyComponent } from '../../../../../components/notify/notify.component';

@Component({
  selector: 'app-leave-project',
  templateUrl: './leave-project.component.html',
  styleUrl: './leave-project.component.css',
})
export class LeaveProjectComponent {
  readonly dialogRef = inject(MatDialogRef<LeaveProjectComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private _snackBar: MatSnackBar, private user: UserService) {}

  buttonClicked() {
    this.user.leaveProject(this.data.id).subscribe((data) => {
      this._snackBar.openFromComponent(NotifyComponent, {
        duration: 5 * 1000,
        data: 'You have left this project!!',
      });
      this.dialogRef.close();
      this.user.fetchMyProjects();
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
