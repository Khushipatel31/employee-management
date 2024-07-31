import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from '../notify/notify.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  loginForm!: FormGroup;
  error: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onFormSubmit() {
    if (this.loginForm.invalid) {
      this.error = 'Please correct the errors in the form.';
      return;
    }
    this.auth.forgotPassword(this.loginForm.value).subscribe(
      (data) => {
        if (data.success) {
          this.router.navigate(['/login']);
          this._snackBar.openFromComponent(NotifyComponent, {
            duration: 5 * 1000,
            data: 'Check your mail!!',
          });
        }
      },
      (error) => {
        console.log(error);
        this.error = error.error.message;
      }
    );
  }
}
