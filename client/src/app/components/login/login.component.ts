import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  error: string = '';

  constructor(private formBuilder:FormBuilder,private auth:AuthService,private router:Router){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    });
    if(this.auth.getRole() && this.auth.getToken()){
      this.auth.verify().subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate([this.auth.getRole()])
        } else {
          this.router.navigate(['']);
        }
      });
  }
  }

  onFormSubmit(){
    if(this.loginForm.invalid) {
      this.error = 'Please correct the errors in the form.';
      return;
    }
    this.auth.login(this.loginForm.value).subscribe((data)=>{
      if(data.success){
        console.log(this.auth.getRole())
        this.router.navigate([this.auth.getRole()]);
      }
    },(error)=>{
      this.error = error.error.message;
    })

  }
}
