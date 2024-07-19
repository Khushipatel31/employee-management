import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  // styleUrl: './designation.component.css'
})
export class DesignationComponent {
  readonly dialogRef = inject(MatDialogRef<DesignationComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  designationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.designationForm=this.formBuilder.group({
      designation:[this.data?.title||'',Validators.required]
    })
  }

  onSubmit(){
    console.log(this.designationForm.value)
  }
}
