import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from '../../../../../../components/notify/notify.component';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css',
})
export class Step3Component {
  formData!: FormGroup;
  newData: any = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
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
    const formValue = this.formData.value;
    let coursesString, profile;
    this.userService.profileSubject.subscribe((data) => {
      coursesString = JSON.stringify(data.courses);
      profile = JSON.stringify(data.profile);
      this.newData = data;
    });
    // this.userService.profileSubject.subscribe((data) => {
    //   const updatedProfile = {
    //     ...data,
    //     ...this.formData.value,
    //     courses: coursesString,
    //     profileCompleted: '2',
    //   };
    //   this.userService.updateProfile(updatedProfile);
    // });
    const updatedProfile = {
      ...this.newData,
      ...formValue,
      profile,
      courses: coursesString,
      profileCompleted: '2',
    };
    console.log(updatedProfile);
    this.userService.updateProfile(updatedProfile);
    this.router.navigate(['/user/dashboard']);
    this._snackBar.openFromComponent(NotifyComponent, {
      duration: 5 * 1000,
      data: 'Your profile is updated successfully!!',
    });
  }
}
