import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from '../../../../../components/notify/notify.component';

@Component({
  selector: 'app-join-project',
  templateUrl: './join-project.component.html',
  styleUrl: './join-project.component.css',
})
export class JoinProjectComponent {
  readonly dialogRef = inject(MatDialogRef<JoinProjectComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(private _snackBar: MatSnackBar, private user: UserService) {}

  buttonClicked() {
    this.user.joinProject(this.data.id).subscribe((data) => {
      this._snackBar.openFromComponent(NotifyComponent, {
        duration: 5 * 1000,
        data: 'You have joined this project Successfully!!',
      });
      this.dialogRef.close();
      this.user.fetchProjects();
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
