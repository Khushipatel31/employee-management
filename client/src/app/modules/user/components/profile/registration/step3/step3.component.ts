import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../../../services/user.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css',
})
export class Step3Component {
  formData!: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
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
