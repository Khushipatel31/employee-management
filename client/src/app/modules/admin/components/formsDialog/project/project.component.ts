import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServices } from '../../../../../services/admin.service';
import { NotifyComponent } from '../../../../../components/notify/notify.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  projectForm!: FormGroup;
  error: string = '';
  loading: Boolean = false;
  valid: Boolean = false;

  readonly dialogRef = inject(MatDialogRef<ProjectComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  //   {
  //     "name": "p4",
  //     "description": "this is p4",
  //     "startDate": "2024-11-17T14:14:19.672+00:00",
  //     "duration": "1"
  // }
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private admin: AdminServices
  ) {
    this.projectForm = this.formBuilder.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      startDate: [this.data?.startDate || '', Validators.required],
      duration: [this.data?.duration || '', Validators.required],
    });
  }

  onFormSubmit() {
    if (this.projectForm.invalid) {
      this.error = 'Enter project details properly';
      return;
    }
    console.log(this.projectForm.value)
    const formValue = this.projectForm.value;
    const formattedDate = formValue.startDate.format('YYYY-MM-DD');

    const formValues = {
      ...formValue,
      startDate: formattedDate,
    };
    console.log(formValues)
    this.loading = true;
    this.admin.addProject(formValues).subscribe((data) => {
      if (data.success) {
        this.dialogRef.close(true);
        this._snackBar.openFromComponent(NotifyComponent, {
          duration: 5 * 1000,
          data: 'Project added Successfully!!',
        });
        this.router.navigate(['admin', 'project']);
      }
    });
  }
}
