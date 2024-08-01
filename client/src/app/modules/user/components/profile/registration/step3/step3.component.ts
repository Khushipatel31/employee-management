import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css',
})
export class Step3Component {
  formData!: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.profileSubject.subscribe((data) => {
      this.formData = this.formBuilder.group({
        address: [data?.address || '', Validators.required],
        city: [data?.city || '', Validators.required],
        state: [data?.state || '', Validators.required],
        pin: [data?.pin || '', Validators.required],
      });
    });
  }
  onFormSubmit() {
    if (this.formData.invalid) {
      return;
    }
    this.userService.profileSubject.subscribe((data) => {
      const coursesString = JSON.stringify(data.courses);
      const updatedProfile = {
        ...data,
        ...this.formData.value,
        courses: coursesString,
        profileCompleted: '2',
      };
      this.userService.updateProfile(updatedProfile).subscribe((data) => {
        this.userService.fetchProfileDetail();
        this.router.navigate(['/user']);
      });
    });
  }
}
