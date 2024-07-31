import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  loginForm!: FormGroup;
  error: string = '';
  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
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
          console.log(data);
          // this.router.navigate(['dashboard']); // Adjust the route as needed
        }
      },
      (error) => {
        console.log(error);
        this.error = error.error.message;
      }
    );
  }
}
