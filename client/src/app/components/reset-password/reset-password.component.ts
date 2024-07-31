import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  error: string = '';
  token: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private r: Router
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  onFormSubmit() {
    if (
      this.resetPasswordForm.get('newPassword')?.value !=
      this.resetPasswordForm.get('confirmPassword')?.value
    ) {
      this.error = 'Password does not match';
      return;
    }
    if (this.resetPasswordForm.invalid) {
      this.error = 'Please correct the errors in the form.';
      return;
    }
    this.auth.resetPassword(this.resetPasswordForm.value, this.token).subscribe(
      (data) => {
        this.r.navigate(['login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
