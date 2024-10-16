import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required],
    // });
    // if (this.auth.getRole() && this.auth.getToken()) {
    //   this.auth.verify().subscribe(
    //     (isAuthenticated) => {
    //       console.log(isAuthenticated);
    //       // if (isAuthenticated) {
    //       //   this.router.navigate([this.auth.getRole()]);
    //       // } else {
    //       //   this.router.navigate(['/login']);
    //       // }
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }
  }

  // ngOnInit(): void {
  //   this.loginForm = this.formBuilder.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required],
  //   });
  //   if (this.auth.getRole() && this.auth.getToken()) {
  //     this.auth.verify().subscribe(
  //       (isAuthenticated) => {
  //         console.log(isAuthenticated);
  //         // if (isAuthenticated) {
  //         //   this.router.navigate([this.auth.getRole()]);
  //         // } else {
  //         //   this.router.navigate(['/login']);
  //         // }
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    console.log(this.auth.getRole());

    if (this.auth.getRole() && this.auth.getToken()) {
      console.log('bla');
      this.auth.verify().subscribe(
        (isAuthenticated) => {
          if (isAuthenticated) {
            console.log('here');
            this.router.navigate([this.auth.getRole()]);
          } else {
            this.router.navigate(['/login']);
          }
        },
        (err) => {
          console.log(err);
          this.error = 'Failed to verify';
        }
      );
    }
  }

  onFormSubmit() {
    if (this.loginForm.invalid) {
      this.error = 'Please correct the errors in the form.';
      return;
    }
    this.auth.login(this.loginForm.value).subscribe(
      (data) => {
        if (data.success) {
          this.router.navigate([this.auth.getRole()]);
        }
      },
      (error) => {
        console.log(error);
        this.error = error.error.message || 'Something went wrong';
      }
    );
  }
}
