import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { UserService } from '../../../../../services/user.service';
import { NotifyComponent } from '../../../../../components/notify/notify.component';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-leave',
  templateUrl: './create-leave.component.html',
  styleUrl: './create-leave.component.css',
})
export class CreateLeaveComponent implements OnInit {
  leaveForm!: FormGroup;
  leaveTypes: string[] = [
    'Sick Leave',
    'Casual Leave',
    'Annual Leave',
    'Maternity Leave',
  ];
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private userServics: UserService,
    private dialogRef: MatDialogRef<CreateLeaveComponent>
  ) {}
  loading = false;
  ngOnInit(): void {
    this.leaveForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }
  onFormSubmit() {
    if (this.leaveForm.invalid) {
      return;
    }

    let formValue = this.leaveForm.value;

    if (typeof formValue.from === 'object') {
      formValue.from = moment(formValue.from).format('YYYY-MM-DD');
    }
    if (typeof formValue.to === 'object') {
      formValue.to = moment(formValue.to).format('YYYY-MM-DD');
    }
    this.userServics.createLeave(formValue).subscribe((data) => {
      if (data) {
        this.dialogRef.close(true);
        this._snackBar.openFromComponent(NotifyComponent, {
          duration: 5 * 1000,
          data: 'Leave Applied Successfully',
        });
      }
    });
  }
}
