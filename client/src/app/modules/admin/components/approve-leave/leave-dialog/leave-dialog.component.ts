import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { AdminServices } from '../../../../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from '../../../../../components/notify/notify.component';

@Component({
  selector: 'app-leave-dialog',
  templateUrl: './leave-dialog.component.html',
  styleUrl: './leave-dialog.component.css',
})
export class LeaveDialogComponent implements OnInit {
  approveForm!: FormGroup;

  readonly dialogRef = inject(MatDialogRef<LeaveDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  constructor(
    private fb: FormBuilder,
    private adminService: AdminServices,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.approveForm = this.fb.group({
      status: ['true'],
    });
  }

  onSubmit(): void {
    let formData = { ...this.approveForm.value };
    if (this.approveForm.value.status == true) {
      formData.status = 1;
    } else {
      formData.status = 2;
    }
    this.adminService.updateLeave(formData, this.data);
    this.dialogRef.close(true);

    if (formData.status == 1) {
      this._snackBar.openFromComponent(NotifyComponent, {
        duration: 5 * 1000,
        data: 'Leave approved Successfully!!',
      });
    } else {
      this._snackBar.openFromComponent(NotifyComponent, {
        duration: 5 * 1000,
        data: 'Leave got rejected!!',
      });
    }
  }
}
