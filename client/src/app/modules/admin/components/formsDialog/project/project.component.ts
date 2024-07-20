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
  
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
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
    if(!this.data.edit){
    this.loading = true;
      const formValue = this.projectForm.value;
      const formattedDate = formValue.startDate.format('YYYY-MM-DD');
      const formValues = {
        ...formValue,
        startDate: formattedDate,
      };
      this.admin.addProject(formValues).subscribe((data) => {
        if (data.success) {
          this.dialogRef.close(true);
          this._snackBar.openFromComponent(NotifyComponent, {
            duration: 5 * 1000,
            data: 'Project added Successfully!!',
          });
          this.admin.fetchProjects();
        }
      });
    }else{
      const formValue = this.projectForm.value;
      console.log(this.data.id)
      let formValues = {
        ...formValue,
        projectId:this.data.id,
      };
      if(typeof(formValue.startDate)=='object'){
        const formattedDate = formValue.startDate.format('YYYY-MM-DD');
        formValues = {
          ...formValue,
        projectId:this.data.id,
          startDate:formattedDate,
        };
      }
      this.admin.editProject(formValues)
    }
    this.loading = false;
    this.dialogRef.close(true);
    this._snackBar.openFromComponent(NotifyComponent, {
      duration: 5 * 1000,
      data: 'Project edited Successfully!!',
    });
   
  }
}
