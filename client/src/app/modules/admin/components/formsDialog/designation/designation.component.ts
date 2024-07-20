import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { AdminServices } from '../../../../../services/admin.service';
import { NotifyComponent } from '../../../../../components/notify/notify.component';
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  // styleUrl: './designation.component.css'
})
export class DesignationComponent {

  designationForm!: FormGroup;
  error: string = '';
  loading:Boolean=false;
  valid:Boolean=false;

  readonly dialogRef = inject(MatDialogRef<DesignationComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private admin:AdminServices
  ) {
    this.designationForm=this.formBuilder.group({
      designation:[this.data?.title||'',Validators.required]
    })
  }

  onFormSubmit(){
    if(this.designationForm.invalid){
      this.error='Enter designation properly';
      return;
    }

    this.loading=true;
    this.admin.addDesignation(this.designationForm.value).subscribe((data)=>{
      if(data.success){
        this.dialogRef.close(true);
        this._snackBar.openFromComponent(NotifyComponent, {
          duration: 5 * 1000,
          data: 'Designation added Successfully!!',
        });
        this.router.navigate(['admin','designation']);
      }
    });

  }
}
