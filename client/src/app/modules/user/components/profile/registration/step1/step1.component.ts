import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css',
})
export class Step1Component implements OnInit {
  formData!: FormGroup;
  error: String = '';
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.profileSubject.subscribe((data) => {
      this.formData = this.formBuilder.group({
        fullname: [data?.fullname || '', Validators.required],
        email: [data?.email || '', Validators.required],
        joinDate: [data?.joinDate || '', Validators.required],
        designation: [data?.designation?.name || '', Validators.required],
      });
    });
  }

  onFormSubmit() {
    // if (this.formData.invalid) {
    //   this.error = 'Enter details properly';
    //   return;
    // } else {
    //   this.error = '';
    // }
    // this.userService.profileSubject.subscribe((data) => {
    //   const coursesString = JSON.stringify(data.courses);
    //   const updatedProfile = {
    //     ...data,
    //     profileCompleted: '0',
    //     ...this.formData.value,
    //     courses: coursesString,
    //   };
    //   this.userService.updateProfile(updatedProfile).subscribe((data) => {
    //     this.error = '';
    //   });
    //   this.userService.fetchProfileDetail();
    // });
  }
}
