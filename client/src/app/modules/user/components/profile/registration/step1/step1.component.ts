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
    console.log(this.formData.value);
    this.userService.profileSubject.subscribe((data) => {
      const updatedProfile = {
        ...data,
        ...this.formData.value,
      };
      this.userService.updateProfile(updatedProfile);
    });
  }
}
